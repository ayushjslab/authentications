import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ Please add your MongoDB URI to .env.local");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "auth",
    });

    isConnected = !!db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
