import { User } from "@/app/models/User";
import { Preference } from "@/app/models/Preference";
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/app/lib/db";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const user = await User.findById(params.id).populate("preferences");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDataBase();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    const data = await request.json();
    const user = await User.findByIdAndUpdate(id, data, { new: true });    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDataBase();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await Preference.deleteMany({ createdBy: user._id });
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({
      message: "User and all associated preferences deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
