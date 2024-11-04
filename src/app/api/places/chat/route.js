import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider";
import { AIModel } from "@/app/constants";

const generateGoogleFindUrlUsingLLM = async (userLocationString, messages) => {
  const llama = createOllama();
  return generateText({
    model: llama(AIModel),
    system: `Your only task is to construct a valid Google Find Place API URL. 
    You are allowed to use information provided in system prompt and the conversation.

    Additional information:
    ${userLocationString}
    
    Additional guidelines you should follow:
      - The URL should be wrapped between three backticks
      - Use radius of 2000 if it can't be determined from the conversation
      - locationbias: A string specifying radius in meters, plus latitude/longitude in decimal degrees. Use the following format: circle:radius@latitude,longitude
      - The Google API key is ${process.env.GOOGLE_API_KEY}
      - inputtype is textquery
      - The fields you should include are: formatted_address, name, rating, opening_hours, geometry
      - The input should be parsed from the conversation.

    Example of a correctly generated URL:
      - https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=mongolian&inputtype=textquery&locationbias=circle:2000@47.6918452,-122.2226413&key=${process.env.GOOGLE_API_KEY}
    `,
    messages,
  });
};

const askForMoreInformation = async (userLocationString, messages) => {
  const llama = createOllama();
  return await generateText({
    model: llama(AIModel),
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
  const re = new RegExp("(http|https)://", "i");
  if (attempt >= 3) return askForMoreInformation(userLocationString, messages);

  const LLMResponse = await generateGoogleFindUrlUsingLLM(
    userLocationString,
    messages
  );

  return re.test(LLMResponse.text)
    ? LLMResponse
    : fetchValidUrl(userLocationString, messages, attempt + 1);
};

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages, data } = request;

  const userLocationString = `The location of the user is latitude ${data.location.latitude} and longitude ${data.location.longitude}.`;

  const { text: validateConversation } = await generateText({
    model: llama(AIModel),
    system: `Your task is to validate if the system prompt and conversation together contains enough information to construct a Google Find Place API request. 
    
    ${userLocationString}
    
    Please only answer with "Yes" or "No".
    `,
    messages,
  });

  console.log("Valid: ", validateConversation);

  if (validateConversation.startsWith("No")) {
    const llmResult = await askForMoreInformation(userLocationString, messages);
    return Response.json({ messages: llmResult.responseMessages });
  }

  const re = new RegExp("(http|https)://", "i");

  const llmPerhapsValidUrl = await fetchValidUrl(userLocationString, messages);

  // Check if the LLM returned a URL
  if (re.test(llmPerhapsValidUrl.text)) {
    const text = llmPerhapsValidUrl.text;
    const url = text.split("```")[1];

    // Locationbias was very hard to get automatically encoded, therefore we will replace it with the encoded version
    // Regex capture locationbias and encode
    const locationBias = encodeURIComponent(
      url.match(/locationbias=(.*?)&/)[1]
    );

    // Regex replace locationbias with encoded locationbias in URL
    const urlToDoRequestToGoogle = url.replace(
      /locationbias=(.*?)&/,
      `locationbias=${locationBias}&`
    );

    console.log("new url:", urlToDoRequestToGoogle);
    const fetchResponse = await fetch(urlToDoRequestToGoogle);
    const fetchResponseData = await fetchResponse.json();

    console.log("Google answer", JSON.stringify(fetchResponseData, null, 2));

    return Response.json({
      // Return all messages except the last one???
      messages: llmPerhapsValidUrl.responseMessages,
      googleData: fetchResponseData,
    });
  }

  // If the LLM did not return a URL, return the messages, i.e. requires more info.
  return Response.json({ messages: llmPerhapsValidUrl.responseMessages });
}
