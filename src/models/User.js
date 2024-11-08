import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    preferences: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preference'
    }],
    favorites:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite'
      }
    ]
  });

  export const User = mongoose.models.User || mongoose.model('User', userSchema);
