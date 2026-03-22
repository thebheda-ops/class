import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing. Create a .env file based on .env.example.");
  }

  await mongoose.connect(uri, {
    autoIndex: true
  });

  console.log("MongoDB connected");
};

export default connectDB;
