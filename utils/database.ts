import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    throw new Error("Error connecting to MongoDB");
  }
};

export default connect;
