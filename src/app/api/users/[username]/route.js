import { NextResponse } from "next/server";
import { connectToDataBase } from "@/app/lib/db";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  console.log("Fetching user data...");
  console.log("Params:", params);
  await connectToDataBase();
  const users = mongoose.connection.db.collection("users");

  const allUsers = await users.find({}).toArray();

  console.log(allUsers);

  return NextResponse.json({ data: "ok" }, { status: 200 });
};
