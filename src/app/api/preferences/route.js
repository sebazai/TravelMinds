import { connectToDataBase } from '@/app/lib/db';
import { Preference } from '@/models/Preference';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDataBase();
    const preferences = await Preference.find().populate('createdBy');
    return NextResponse.json(preferences);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Example usage:
// fetch('/api/preferences', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       title: 'Sport',
//       description: 'Basketball',
//       icon: '-ball',
//       createdBy: 'USER_ID' //
//     })
//   });

export async function POST(request) {
  try {
    await connectToDataBase();
    const data = await request.json();
    const preference = await Preference.create(data);
    await User.findByIdAndUpdate(data.createdBy, {
      $push: { preferences: preference._id },
    });
    return NextResponse.json(preference, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
