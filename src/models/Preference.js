import mongoose from "mongoose";
const preferenceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  icon: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Preference =
  mongoose.models.Preference || mongoose.model("Preference", preferenceSchema);
