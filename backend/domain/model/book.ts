import mongoose, { Schema, Types } from "mongoose";

export interface IBook extends Document {
    _id: Types.ObjectId;
    title: string;
    status: "available" | "borrowed";
}

export interface BookData {
    _id: string;
    title: string;
    status: "available" | "borrowed";
    isBorrowedByMe: boolean;
}

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "borrowed"],
        default: "available",
    },
});

bookSchema.post("save", () => {
    console.log("📕 A new book has been saved.");
});

bookSchema.post("findOneAndDelete", () => {
    console.log("📕 the book has been deleted.");
});

export default mongoose.model<IBook>("Book", bookSchema);
