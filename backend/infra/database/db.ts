import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("✅  Mongo DB connected successfully");
    } catch (err) {
        throw err;
    }
}
