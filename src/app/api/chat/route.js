import { streamText } from 'ai';
import { NextResponse } from 'next/server';
import { createOllama } from 'ollama-ai-provider';
import { AIModel } from '@/app/constants';

export async function POST(req) {
  const llama = createOllama();
  const request = await req.json();
  const { messages } = request;

  const result = await streamText({
    model: llama(AIModel),
    messages,
  });

  return result.toDataStreamResponse();
}
