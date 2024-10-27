import { User } from "@/models/User";
import { Preference } from "@/models/Preference";
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

// {
//   "username": "putUser",
// }
export async function PUT(request, { params }) {
  try {
    await connectToDataBase();
    const data = await request.json();
    const { preferences, ...updateData } = data;
    const user = await User.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("preferences");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Update error:", error);
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
