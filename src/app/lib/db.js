import mongoose from 'mongoose';
// track the connection
let isConnected = false;
export const connectToDataBase = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('DB connected already');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'travelminds',
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
