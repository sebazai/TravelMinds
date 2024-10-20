import { connectToDataBase } from "@/app/lib/db";
import { User } from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDataBase();
    const users = await User.find().populate('preferences');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Example usage:
// fetch('/api/users', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ username: 'john' })
// });

export async function POST(request) {
  try {
    await connectToDataBase();
    const data = await request.json();
    const user = await User.create(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}