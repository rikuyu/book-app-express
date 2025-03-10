import mongoose, {Schema} from "mongoose";

export interface IBook extends Document {
    title: string;
    status: "available" | "borrowed";
}

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "borrowed"], default: "available",
    },
});

export default mongoose.model<IBook>("Book", bookSchema);
