import { generateText } from "ai";
import { NextResponse } from "next/server";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages, data } = request;

  const userLocationString = `The location of the user is latitude ${data.location.latitude} and longitude ${data.location.longitude}.`;

  const { text } = await generateText({
    model: llama("openhermes2.5-mistral"),
    system: `Your task is to provide a JSON output of the places you find based on user's latitude and longitude.
    
    ${userLocationString}
    `,
    messages,
  });
  console.log(text);
  return NextResponse.json(text, { status: 201 });
}
