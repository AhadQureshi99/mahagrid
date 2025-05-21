// app/server/connect.js
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://ahadqureshi16756:ahad123@cluster0.tlo17.mongodb.net/mahagrid?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(`Database connected on host ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw new Error("Database connection failed");
  }
};

export default connectDB;