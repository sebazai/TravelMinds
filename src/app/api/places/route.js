import { generateText } from "ai";
import { NextResponse } from "next/server";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { prompt, data } = request;

  const systemPrompt = `You are a helpful tour guide.

    Your task is to find relevant information about places based on user input. Limit the search close to the user's location and to a maximum of five places.
    The location of the user is latitude ${data.location[0]} and longitude ${data.location[1]}.

    The output for each place should include keys "address", "name", and "coordinates". "coordinates" is an object with keys "latitude" and "longitude".

    Please wrap your JSON output in three backticks. The JSON should only contain one key named "places" and the value being the an array of places. Ensure there are no duplicate places. 
    `;

  console.log("System:", systemPrompt);
  console.log("User prompt:", prompt);
  const { text } = await generateText({
    model: llama("openhermes2.5-mistral"),
    system: systemPrompt,
    prompt,
  });

  console.log("LLM Output:", text);

  const json = text.split("```")[1];
  return NextResponse.json(json);
}
