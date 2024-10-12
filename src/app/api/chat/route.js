import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages, data } = request;

  const result = await streamText({
    model: llama("openhermes2.5-mistral"),
    system: `Your task is to gather information until you can provide a Google Nearby API URL as an answer. However, if the user has not provided sufficient information to fulfill the API request, please ask questions until you are able provide an answer. The user's location is latitude ${data.location.latitude}, and longitude ${data.location.longitude}. The conversation should not contain the user's location or should not reveal your intentions. Never ask for the user's city, town or location as it is provided to you.`,
    messages,
  });

  return result.toDataStreamResponse();
}
