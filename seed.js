import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./src/models/User.js";
import { Preference } from "./src/models/Preference.js";
import { Favorite } from "./src/models/Favorite.js";

dotenv.config({ path: ".env.local" });

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Can be removed if you're using Mongoose v6+
      useUnifiedTopology: true, // Can be removed if you're using Mongoose v6+
    });
    console.log("Connected to database:", mongoose.connection.name);

    // Clear the User and Preference collections
    await User.deleteMany({});
    await Preference.deleteMany({});
    await Favorite.deleteMany({});
    console.log("User and Preference collections cleared.");

    // Create a new user
    const newUser = new User({
      username: "sampleUser",
      firstName: "John",
      lastName: "Doe",
      countryOfOrigin: "United States",
      countryCode: "US",
      preferences: [],
    });
    await newUser.save();
    console.log("Sample user created:", newUser);

    // Create preferences with the user’s _id as `createdBy`
    const preferencesData = [
      {
        title: "Travel",
        description: "Enjoys traveling",
        icon: "travel-icon",
        createdBy: newUser._id,
      },
      {
        title: "Music",
        description: "Loves music",
        icon: "music-icon",
        createdBy: newUser._id,
      },
      {
        title: "Food",
        description: "Food enthusiast",
        icon: "food-icon",
        createdBy: newUser._id,
      },
    ];

    // Save the preferences and link them to the user
    const savedPreferences = await Preference.insertMany(preferencesData);
    newUser.preferences = savedPreferences.map((preference) => preference._id); // Add preference IDs to user
    await newUser.save(); // Update the user with linked preferences

    console.log("Preferences created and linked to user:", savedPreferences);

    // Disconnect from the database
    mongoose.disconnect();
    console.log("Seeding completed, database connection closed.");
  } catch (error) {
    console.error("Error seeding the database:", error);
    mongoose.disconnect();
  }
}

seedDatabase();
