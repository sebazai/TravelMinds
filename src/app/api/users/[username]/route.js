import { NextResponse } from "next/server";
import { connectToDataBase } from "@/app/lib/db";
import mongoose from "mongoose";

// Define the User schema if it hasn't been defined yet
const UserSchema = new mongoose.Schema({
username: String,
preferences: [String],
});

// Use the existing or create the User model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export const GET = async (req, { params }) => {
console.log("Fetching user data...");
console.log("Params:", params);
await connectToDataBase();
const users = mongoose.connection.db.collection("users");

const allUsers = await users.find({}).toArray();

console.log(allUsers);

return NextResponse.json({ data: allUsers }, { status: 200 });
};

// Create a new user
export const POST = async (req) => {
console.log("Creating user data...");
const { username, preferences } = await req.json();
try {
await connectToDataBase();
const newUser = new User({ username, preferences });
await newUser.save();
return NextResponse.json(newUser, { status: 201 });
} catch (error) {
return NextResponse.json({ message: error.message }, { status: 400 });
}
};