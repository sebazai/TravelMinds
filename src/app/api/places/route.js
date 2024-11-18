// import { generateText } from 'ai';
import { NextResponse } from 'next/server';
// import { createOllama } from 'ollama-ai-provider';
// import { AIModel } from '@/app/constants';
import Groq from 'groq-sdk';
import { AIModel } from '@/app/constants';

export async function POST(req) {
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY, // This is the default and can be omitted
  });

  const request = await req.json();
  console.log('CALLING POST /api/places');
  const { prompt, data } = request;

  const systemPrompt = `You are a helpful tour guide.

    Your task is to find relevant places to visit based on user preferences expressed in user input.
    The location is ${data.location}.

    Here are additional guidelines you should follow:
      1. Search close to the location provided.
      2. Limit the result to a maximum of 5 places.
      3. Provide the street address of the place.

    The output for each place should include keys "address", "name", "justification", "opens_at" and "closes_at". 
    The "address" key should contain the address of the place. Justification should explain why you think the place is relevant to the user based on the user input.

    Please wrap your JSON output in three backticks. The JSON should only contain one key named "places" and the value being the an array of places. Ensure there are no duplicate places. 
    `;

  console.log('System:', systemPrompt);
  console.log('User prompt:', prompt);

  const chatCompletion = await client.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    temperature: 0.25,
    model: AIModel,
    stream: false,
    response_format: { type: 'json_object' },
  });

  const text = JSON.parse(chatCompletion.choices[0].message.content);

  console.log(
    'Chat completion:',
    JSON.stringify(
      JSON.parse(chatCompletion.choices[0].message.content),
      undefined,
      2,
    ),
  );

  // const { text } = await generateText({
  //   model: llama(AIModel),
  //   system: systemPrompt,
  //   prompt,
  // });

  console.log('LLM Output:', text);

  const enrichPlaces = await Promise.all(
    text.places.map(async (place) => {
      const googleGeoLocation = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place.address)}&key=${process.env.GOOGLE_API_KEY}`;
      const response = await fetch(googleGeoLocation);
      const json = await response.json();

      return {
        ...place,
        description: place.justification,
        coordinates: {
          latitude: json.results[0].geometry.location.lat,
          longitude: json.results[0].geometry.location.lng,
        },
      };
    }),
  );
  return NextResponse.json({ places: enrichPlaces });
}
