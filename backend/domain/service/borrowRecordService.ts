import BorrowRecord, { IBorrowRecord } from "../model/borrowRecord";
import Book, { IBook } from "../model/book";
import mongoose from "mongoose";
import { NotFoundError } from "../../shared/error/notFoundError";
import { BadRequestError } from "../../shared/error/badRequestError";

export const getBorrowRecords = async (): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({});
    return toObjectArray(borrowRecords);
};

export const getBorrowRecordsByBook = async (
    bookId: string
): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({ book_id: bookId });
    return toObjectArray(borrowRecords);
};

export const getBorrowRecordsByUser = async (
    userId: string
): Promise<IBorrowRecord[]> => {
    const borrowRecords = await BorrowRecord.find({ user_id: userId });
    return toObjectArray(borrowRecords);
};

const toObjectArray = (records: mongoose.Document[]) =>
    records.map((record) => record.toObject());

export const borrowBook = async (userId: string, bookId: string): Promise<void> => {
    if (!bookId) {
        throw new BadRequestError("book id undefined");
    }
    if (!userId) {
        throw new BadRequestError("user id undefined");
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    return Book.findById(bookId)
        .exec()
        .then((book: IBook) => {
            if (!book) {
                throw new NotFoundError("No book found error");
            }
            if (book.status != "available") {
                throw new NotFoundError("No available book error");
            }
        })
        .then(async () => {
            await BorrowRecord.create([{ user_id: userId, book_id: bookId }], {
                session,
            });
            return Book.findByIdAndUpdate(
                bookId,
                { status: "borrowed" },
                { new: true, session }
            );
        })
        .then(async (b: IBook) => {
            if (!b) {
                throw new NotFoundError("No book found with the given id");
            }
            await session.commitTransaction();
        })
        .catch(async (err) => {
            await session.abortTransaction();
            throw err;
        })
        .finally(async () => await session.endSession());
};

export const returnBook = async (userId: string, bookId: string): Promise<void> => {
    if (!bookId) {
        throw new BadRequestError("book id undefined");
    }
    if (!userId) {
        throw new BadRequestError("user id undefined");
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    return Book.find({ _id: bookId })
        .then((books: IBook[]) => {
            if (books.length == 0 || books.length > 1) {
                throw new NotFoundError("No book found error");
            }
            if (books[0].status != "borrowed") {
                throw new NotFoundError("No borrowed book error");
            }
        })
        .then(() => {
            return BorrowRecord.findOneAndUpdate(
                {
                    user_id: userId,
                    book_id: bookId,
                    returned_date: { $exists: false },
                },
                { returned_date: new Date() },
                { new: true, session }
            );
        })
        .then(async (b) => {
            if (!b) {
                throw new NotFoundError("No matching borrow record found");
            }
            return Book.findByIdAndUpdate(
                bookId,
                { status: "available" },
                { new: true, session }
            );
        })
        .then(async (b) => {
            if (!b) {
                throw new NotFoundError("No book found with the given id");
            }
            await session.commitTransaction();
        })
        .catch(async (err) => {
            await session.abortTransaction();
            throw err;
        })
        .finally(async () => await session.endSession());
};
