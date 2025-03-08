import mongoose, {Schema} from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "borrowed"], default: "available",
    },
});

export default mongoose.model("Book", bookSchema);
