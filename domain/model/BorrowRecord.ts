import mongoose, {Schema} from "mongoose";

const borrowRecordSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: "User", required: true,
    },
    book_id: {
        type: Schema.Types.ObjectId, ref: "Book", required: true,
    },
    borrowed_date: {
        type: Date, required: true, default: Date.now,
    },
    returned_date: {
        type: Date,
    },
});

export default mongoose.model("BorrowRecord", borrowRecordSchema);
