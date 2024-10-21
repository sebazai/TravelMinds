import { generateText } from "ai";
import { NextResponse } from "next/server";
import { createOllama } from "ollama-ai-provider";

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { prompt, data } = request;

  const systemPrompt = `You are a helpful tour guide.
    
    Your task is to find relevant information about places based on user input. Limit the search to the user's location and five places.
    The location of the user is latitude ${data.location[0]} and longitude ${data.location[1]}.

    The output should be a JSON Array with objects that include keys "address", "name", and "coordinates" in your JSON output.
    coordinates is an object with keys "latitude" and "longitude".

    Please wrap your output in a JSON object with a key "places" and the value being the JSON Array of places.
    `;

  console.log("System:", systemPrompt);
  console.log("User prompt:", prompt);
  const { text } = await generateText({
    model: llama("openhermes2.5-mistral"),
    system: systemPrompt,
    prompt,
  });

  console.log("LLM Output:", text);

  // try {
  //   JSON.parse(text);
  // } catch (error) {
  //   return NextResponse.json({ error: error.message }, { status: 400 });
  // }
  return NextResponse.json(text, { status: 200 });
}
