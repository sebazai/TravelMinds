import { streamText, generateText } from "ai";
import { NextResponse } from "next/server";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages, data } = request;

  const {
    text: validateConversation,
    responseMessages: validateResponseMessages,
  } = await generateText({
    model: llama("openhermes2.5-mistral"),
    system: `Your task is to validate if the conversation contains enough information to construct a Google Nearby API request. The location of the user is latitude ${data.location.latitude}, and longitude ${data.location.longitude}. 
    
    Please only answer with "Yes" or "No".
    `,
    messages,
  });

  if (validateConversation.startsWith("No")) {
    console.log("Valid: ", validateConversation);
    const { responseMessages } = await generateText({
      model: llama("openhermes2.5-mistral"),
      system: `Your task is to ask the user for more information so that you can construct a Google Nearby API request. 
      
      The location of the user is latitude ${data.location.latitude}, and longitude ${data.location.longitude}.

      Never reveal your intentions to the user. Instead, ask questions that will help you construct the Google Nearby API request.
    `,
      messages,
    });
    return Response.json({ messages: responseMessages });
  }

  const { text, responseMessages: theUrlMessages } = await generateText({
    model: llama("openhermes2.5-mistral"),
    system: `Your only task is to construct a valid Google Nearby API URL.
    The location of the user is latitude ${data.location.latitude}, and longitude ${data.location.longitude}. 
    
    The url should be wrapped between three backticks.

    The answer should start with https://maps.googleapis.com/maps/api/place/nearbysearch with the appropriate parameters. A placeholder for the API key should be YOUR_API_KEY. 
    `,
    messages,
  });
  console.log("URL:", text);
  const re = new RegExp("(http|https)://", "i");
  console.log("Test:", re.test(text));
  if (re.test(text)) {
    console.log(text.split("```")[1]);
    return Response.json({ messages: theUrlMessages });
  }

  // Do the Google API request
  console.log("Google API request");

  // Placeholder....
  return Response.json({ messages: responseMessages });
}
