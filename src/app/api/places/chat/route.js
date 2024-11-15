import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { AIModel } from '@/app/constants';

const generateGoogleFindUrlUsingLLM = async (userLocationString, messages) => {
  return generateText({
    model: groq(AIModel),
    system: `Your only task is to construct a valid Google Place Search URL using Google Text Search. 
    You are allowed to use information provided in system prompt and the conversation.

    Additional information:
    ${userLocationString}
    
    Additional guidelines you should follow:
      - The URL should be wrapped between three backticks
      - Use radius of 2000 if it can't be determined from the conversation
      - The query should be parsed from the conversation.
      - As last in the URL add placeholder for key as following: &key=<API_KEY>

    Example of a correctly generated URL:
      - https://maps.googleapis.com/maps/api/place/textsearch/json?location=42.3675294%2C-71.186966&query=123%20main%20street&radius=2000&key=<API_KEY>
    `,
    messages,
  });
};

const askForMoreInformation = async (userLocationString, messages) => {
  return generateText({
    model: groq(AIModel),
    system: `Your task is to ask the user for more information so that you can construct a Google Find Place API URL. You can also use any information provided in the system prompt to generate the API URL.
    
    ${userLocationString}

    Never reveal your intentions to the user. 
    Instead, ask non-technical questions that will help you construct the Google Find Place API request.
    `,
    messages,
  });
};

// Try naively three times to generate the freaking Google url, otherwise return null
const fetchValidUrl = async (userLocationString, messages, attempt = 0) => {
  const re = new RegExp('(http|https)://', 'i');
  if (attempt >= 3) return askForMoreInformation(userLocationString, messages);

  const LLMResponse = await generateGoogleFindUrlUsingLLM(
    userLocationString,
    messages,
  );

  return re.test(LLMResponse.text)
    ? LLMResponse
    : fetchValidUrl(userLocationString, messages, attempt + 1);
};

export async function POST(req) {
  console.log('CALLING POST /API/PLACES/CHAT');
  const request = await req.json();
  const { messages, data } = request;

  console.log('Messages:', messages);
  console.log('Data:', data);

  const userLocationString = `The location of the user is ${data.location}. The coordinates are latitude ${data.position[0]}, longitude ${data.position[1]}.`;

  const { text: validateConversation } = await generateText({
    model: groq(AIModel),
    system: `Your task is to validate if the system prompt and conversation together contains enough information to construct a Google Find Place API request. 
    
    ${userLocationString}
    
    Please only answer with "Yes" or "No".
    `,
    messages,
  });

  console.log('Valid: ', validateConversation);

  if (validateConversation.startsWith('No')) {
    const llmResult = await askForMoreInformation(userLocationString, messages);
    return Response.json({ messages: llmResult.responseMessages });
  }

  const re = new RegExp('(http|https)://', 'i');

  const llmPerhapsValidUrl = await fetchValidUrl(userLocationString, messages);

  // Check if the LLM returned a URL
  if (re.test(llmPerhapsValidUrl.text)) {
    const text = llmPerhapsValidUrl.text;
    const url = text.split('```')[1] ?? text;

    console.log('Text:', text);
    console.log('Found url:', url);

    const urlWithApiKey = url.replace(/<API_KEY>/, process.env.GOOGLE_API_KEY);

    console.log('new url:', urlWithApiKey);
    const fetchResponse = await fetch(urlWithApiKey);
    const fetchResponseData = await fetchResponse.json();

    console.log('Google answer', JSON.stringify(fetchResponseData, null, 2));

    return Response.json({
      // Return all messages except the last one???
      messages: llmPerhapsValidUrl.responseMessages,
      googleData: fetchResponseData,
    });
  }

  // If the LLM did not return a URL, return the messages, i.e. requires more info.
  return Response.json({ messages: llmPerhapsValidUrl.responseMessages });
}
