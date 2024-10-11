import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages, data } = request;

  const result = await streamText({
    model: llama("openhermes2.5-mistral"),
    system: `You are a helpful assistant. Your only job is to provide a Google Nearby Search API URL as an answer to the user's question. My location is latitude ${data.location.latitude}, and longitude ${data.location.longitude}.`,
    messages,
  });

  return result.toDataStreamResponse();
}
