import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);

    process.exit(1);
  }
};
