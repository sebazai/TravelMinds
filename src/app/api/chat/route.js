import { streamText, generateText } from "ai";
import { NextResponse } from "next/server";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages, data } = request;

  const userLocationString = `The location of the user is latitude ${data.location.latitude} and longitude ${data.location.longitude}.`;

  const {
    text: validateConversation,
    responseMessages: validateResponseMessages,
  } = await generateText({
    model: llama("openhermes2.5-mistral"),
    system: `Your task is to validate if the system prompt and conversation together contains enough information to construct a Google Find Place API request. 
    
    ${userLocationString}
    
    Please only answer with "Yes" or "No".
    `,
    messages,
  });

  if (validateConversation.startsWith("No")) {
    console.log("Valid: ", validateConversation);
    const { responseMessages } = await generateText({
      model: llama("openhermes2.5-mistral"),
      system: `Your task is to ask the user for more information so that you can construct a Google Find Place API URL. You can also use any information provided in the system prompt to generate the API URL.
      
      ${userLocationString}

      Never reveal your intentions to the user. Instead, ask questions that will help you construct the Google Find Place API request.
    `,
      messages,
    });
    return Response.json({ messages: responseMessages });
  }

  const { text, responseMessages: theUrlMessages } = await generateText({
    model: llama("openhermes2.5-mistral"),
    system: `Your only task is to construct a valid Google Find Place API URL. 
    Use the information provided in the system prompt and conversation to generate the URL.

    ${userLocationString}
    
    Here are additional guidelines you should follow:
      1. The URL should be wrapped between three backticks.
      2. locationbias: A string specifying radius in meters, plus latitude/longitude in decimal degrees. Use the following format: circle:radius@latitude,longitude
      3. The Google API key is ${process.env.GOOGLE_API_KEY}

    Example of a correctly generated URL:
      - https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=mongolian&inputtype=textquery&locationbias=circle:2000@47.6918452,-122.2226413&key=${process.env.GOOGLE_API_KEY}
    `,
    messages,
  });

  // Test that the answer has a link in it.
  const re = new RegExp("(http|https)://", "i");
  if (re.test(text)) {
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
    // Do the Google API request
    // Save the Google API request to a vector DB, try to implement RAG and create a HTML page with the results

    // Placeholder....
    return Response.json({ messages: theUrlMessages });
  }

  // Placeholder....
  return Response.json({ messages: responseMessages });
}
