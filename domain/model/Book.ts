import mongoose, {Schema} from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["AVAILABLE", "BORROWED"], default: "AVAILABLE",
    },
});

export default mongoose.model("Book", bookSchema);
