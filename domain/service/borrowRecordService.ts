import BorrowRecord, {IBorrowRecord} from "../model/borrowRecord";
import Book, {IBook} from "../model/book";
import mongoose from "mongoose";
import {NotFoundError} from "../../shared/error/notFoundError";

export const getBorrowRecords = async (): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({});
    return toObjectArray(borrowRecords);
};

export const getBorrowRecordByBook = async (bookId: string): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({book_id: bookId});
    return toObjectArray(borrowRecords);
};

export const getBorrowRecordByUser = async (userId: string): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({user_id: userId});
    return toObjectArray(borrowRecords);
};

const toObjectArray = (records: any[]) => records.map(record => record.toObject());

export const borrowBook = async (
    userId: string,
    bookId: string,
): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    return Book.find({_id: bookId})
        .then((books: IBook[]) => {
            if (books.length == 0 || books.length > 1) {
                throw new NotFoundError("No book found error", 404);
            }
            if (books[0].status != "available") {
                throw new NotFoundError("No available book error", 404);
            }
        })
        .then(async () => {
            await BorrowRecord.create([{user_id: userId, book_id: bookId}], {session});
            return Book.findByIdAndUpdate(bookId, {status: "borrowed"}, {new: true, session});
        })
        .then(async (b: IBook) => {
            if (!b) {
                throw new NotFoundError("No book found with the given id", 404);
            }
            await session.commitTransaction();
        })
        .catch(async (err) => {
            await session.abortTransaction();
            throw err;
        })
        .finally(async () => await session.endSession());
};

export const returnBook = async (
    borrowRecordId: string,
    bookId: string,
): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    return Book.find({_id: bookId})
        .then((books: IBook[]) => {
            if (books.length == 0 || books.length > 1) {
                throw new NotFoundError("No book found error", 404);
            }
            if (books[0].status != "borrowed") {
                throw new NotFoundError("No borrowed book error", 404);
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
                throw new NotFoundError("No matching borrow record found", 404);
            }
            return Book.findByIdAndUpdate(bookId, {status: "available"}, {new: true, session});
        })
        .then(async (b) => {
            if (!b) {
                throw new NotFoundError("No book found with the given id", 404);
            }
            await session.commitTransaction();
        })
        .catch(async (err) => {
            await session.abortTransaction();
            throw err;
        })
        .finally(async () => await session.endSession());
};
