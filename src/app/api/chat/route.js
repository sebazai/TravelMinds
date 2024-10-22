import { streamText } from "ai";
import { NextResponse } from "next/server";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages } = request;

  const result = await streamText({
    model: llama("openhermes2.5-mistral"),
    messages,
  });

  return result.toDataStreamResponse();
}
