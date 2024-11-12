import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Favorite =
  mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
