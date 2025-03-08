import mongoose, {Schema} from "mongoose";

export interface IBorrowRecord {
    user_id: mongoose.Types.ObjectId;
    book_id: mongoose.Types.ObjectId;
    borrowed_date: Date;
    returned_date: Date;
}

const borrowRecordSchema = new Schema<IBorrowRecord>({
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

export default mongoose.model<IBorrowRecord>("BorrowRecord", borrowRecordSchema);
