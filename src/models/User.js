import mongoose from "mongoose";
import { Preference } from "./Preference.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  countryOfOrigin: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  currentLocation: {
    city: {
      type: String,
      required: true,
    },
  },

  preferences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Preference",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favorite",
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
