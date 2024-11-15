import { streamText } from 'ai';
import { AIModel } from '@/app/constants';
import { createGroq } from '@ai-sdk/groq';

export async function POST(req) {
  const groq = createGroq({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

  const request = await req.json();
  const { messages } = request;

  const result = await streamText({
    model: groq(AIModel),
    messages,
  });

  return result.toDataStreamResponse();
}
