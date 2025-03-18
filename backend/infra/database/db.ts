import mongoose from "mongoose";

export async function connectToDatabase() {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("✅  Mongo DB connected successfully");
}
