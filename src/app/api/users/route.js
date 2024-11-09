import { connectToDataBase } from "@/app/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { Favorite } from "@/models/Favorite";
import { Preference } from "@/models/Preference";

export async function GET() {
  try {
    await connectToDataBase();
    const users = await User.findOne()
      .populate({ path: "preferences", model: Preference })
      .populate({ path: "favorites", model: Favorite });
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
