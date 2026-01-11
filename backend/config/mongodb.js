import mongoose from "mongoose";
import env from "./environment.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.DATABASE_NAME
    });
    console.log(`Connected to MongoDB database: ${env.DATABASE_NAME}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
