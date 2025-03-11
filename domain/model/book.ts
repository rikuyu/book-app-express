import mongoose, {Schema, Types} from "mongoose";

export interface IBook extends Document {
    _id: Types.ObjectId,
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
