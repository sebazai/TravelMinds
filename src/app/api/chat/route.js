import { streamText } from 'ai';
import { AIModel } from '@/app/constants';
import { createOpenAI } from '@ai-sdk/openai';

export async function POST(req) {
  const groq = createOpenAI({
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
