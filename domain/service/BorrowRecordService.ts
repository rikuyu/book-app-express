import BorrowRecord, {IBorrowRecord} from "../model/BorrowRecord";
import Book, {IBook} from "../model/Book";
import mongoose from "mongoose";

const getBorrowRecords = async (): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({});
    return toObjectArray(borrowRecords);
};

const getBorrowRecordByBook = async (bookId: string): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({book_id: bookId});
    return toObjectArray(borrowRecords);
};

const getBorrowRecordByUser = async (userId: string): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({user_id: userId});
    return toObjectArray(borrowRecords);
};

const toObjectArray = (records: any[]) => records.map(record => record.toObject());

const borrowBook = async (
    userId: string,
    bookId: string,
): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    return Book.find({_id: bookId})
        .then((books: IBook[]) => {
            if (books.length == 0 || books.length > 1) {
                throw new Error("No book found error");
            }
            if (books[0].status != "available") {
                throw new Error("No available book error");
            }
        })
        .then(async () => {
            await BorrowRecord.create([{user_id: userId, book_id: bookId}], {session});
            return Book.findByIdAndUpdate(bookId, {status: "borrowed"}, {new: true, session});
        })
        .then(async (b: IBook) => {
            if (!b) {
                throw new Error("No book found with the given ID.");
            }
            await session.commitTransaction();
        })
        .catch(async (err) => {
            await session.abortTransaction();
            throw err;
        })
        .finally(async () => await session.endSession());
};

const returnBook = async (
    borrowRecordId: string,
    bookId: string,
): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    return Book.find({_id: bookId})
        .then((books: IBook[]) => {
            if (books.length == 0 || books.length > 1) {
                throw new Error("No book found error");
            }
            if (books[0].status != "borrowed") {
                throw new Error("No borrowed book error");
            }
        })
        .then(() => {
            return BorrowRecord.findOneAndUpdate(
                {
                    _id: borrowRecordId,
                    book_id: bookId,
                    returned_date: {$exists: false},
                },
                {returned_date: new Date()},
                {new: true, session},
            );
        })
        .then(async (b) => {
            if (!b) {
                throw new Error("No matching borrow record found");
            }
            return Book.findByIdAndUpdate(bookId, {status: "available"}, {new: true, session});
        })
        .then(async (b) => {
            if (!b) {
                throw new Error("No book found with the given id");
            }
            await session.commitTransaction();
        })
        .catch(async (err) => {
            await session.abortTransaction();
            throw err;
        })
        .finally(async () => await session.endSession());
};

export default {
    getBorrowRecords,
    getBorrowRecordByBook,
    getBorrowRecordByUser,
    borrowBook,
    returnBook,
};
