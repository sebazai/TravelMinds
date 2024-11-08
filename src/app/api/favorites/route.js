import { connectToDataBase } from '@/app/lib/db';
import { Favorite } from '@/models/Favorite';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDataBase();
    const favorites = await Favorite.find().populate('createdBy');
    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Example usage for fetching favorites:
// fetch('/api/favorites', {
//     method: 'GET'
// });

export async function POST(request) {
  try {
    await connectToDataBase();
    const data = await request.json();

    const favorite = await Favorite.create(data);

    await User.findByIdAndUpdate(
      data.createdBy,
      { $push: { favorites: favorite._id } } 
    );

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Example usage for adding a favorite:
// fetch('/api/favorites', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       title: 'Beautiful Beach',
//       location: 'Hawaii',
//       rating: 5,
//       description: 'A stunning beach with crystal clear waters.',
//       photo: 'http://example.com/photo.jpg',
//       createdBy: 'USER_ID' // Replace with the actual user ID
//     })
//   });
