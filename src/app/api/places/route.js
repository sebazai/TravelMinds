import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { createOllama } from 'ollama-ai-provider';
import { AIModel } from '@/app/constants';

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  console.log('CALLING POST /api/places');
  const { prompt, data } = request;

  const systemPrompt = `You are a helpful tour guide.

    Your task is to find relevant places to visit based on user preferences expressed in user input.
    The location is ${data.location}.

    Here are additional guidelines you should follow:
      1. Limit the search close to the location provided.
      2. Limit the search to a maximum of 5 places.
      3. Ensure the places are unique.
      4. Ensure the same address is not repeated.
      5. Ensure the same name is not repeated.

    The output for each place should include keys "address", "name", and "justification". 
    The "address" key should contain the address of the place. Justification should explain why you think the place is relevant to the user based on the user input.

    Please wrap your JSON output in three backticks. The JSON should only contain one key named "places" and the value being the an array of places. Ensure there are no duplicate places. 
    `;

  console.log('System:', systemPrompt);
  console.log('User prompt:', prompt);
  const { text } = await generateText({
    model: llama(AIModel),
    system: systemPrompt,
    prompt,
  });

  console.log('LLM Output:', text);

  const json = text.split('```')[1];
  const resp = JSON.parse(json.startsWith('json') ? json.slice(4) : json);

  const enrichPlaces = await Promise.all(
    resp.places.map(async (place) => {
      const googleGeoLocation = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place.address)}&key=${process.env.GOOGLE_API_KEY}`;
      const response = await fetch(googleGeoLocation);
      const json = await response.json();

      return {
        ...place,
        coordinates: {
          latitude: json.results[0].geometry.location.lat,
          longitude: json.results[0].geometry.location.lng,
        },
      };
    }),
  );
  return NextResponse.json({ places: enrichPlaces });
}
