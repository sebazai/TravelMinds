import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/User.js';
import { Preference } from './src/models/Preference.js';
import { Favorite } from './src/models/Favorite.js';

dotenv.config({ path: '.env.local' });

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'travelminds',
      useUnifiedTopology: true,
    });
    console.log('Connected to database:', mongoose.connection.name);

    // Clear the User and Preference collections
    await User.deleteMany({});
    await Preference.deleteMany({});
    await Favorite.deleteMany({});
    console.log('User and Preference collections cleared.');

    // Create a new user
    const newUser = new User({
      username: 'sampleUser',
      firstName: 'John',
      lastName: 'Doe',
      countryOfOrigin: 'United States',
      countryCode: 'US',
      currentLocation: {
        city: 'New York',
      },
      preferences: [],
      favorites: [],
    });
    await newUser.save();
    console.log('Sample user created:', newUser);

    const favoritesData = {
      title: 'Central Park',
      location: 'New York',
      rating: 5,
      description: 'Central Park is an urban park in New York City.',
      photo: 'https://source.unsplash.com/featured/?centralpark',
      createdBy: newUser._id,
    };

    // Create preferences with the user’s _id as `createdBy`
    const preferencesData = [
      {
        title: 'Travel',
        description: 'Enjoys traveling',
        icon: 'travel-icon',
        createdBy: newUser._id,
      },
      {
        title: 'Music',
        description: 'Loves music',
        icon: 'music-icon',
        createdBy: newUser._id,
      },
      {
        title: 'Food',
        description: 'Food enthusiast',
        icon: 'food-icon',
        createdBy: newUser._id,
      },
    ];

    // Save the preferences and link them to the user
    const savedPreferences = await Preference.insertMany(preferencesData);
    const savedFavorite = await Favorite.create(favoritesData);
    newUser.preferences = savedPreferences.map((preference) => preference._id); // Add preference IDs to user
    newUser.favorites = [savedFavorite._id];
    await newUser.save(); // Update the user with linked preferences

    console.log('Preferences created and linked to user:', savedPreferences);

    // Disconnect from the database
    mongoose.disconnect();
    console.log('Seeding completed, database connection closed.');
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.disconnect();
  }
}

seedDatabase();
