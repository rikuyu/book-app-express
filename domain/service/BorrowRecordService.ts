import BorrowRecord from "../model/BorrowRecord";
import Book from "../model/Book";
import mongoose from "mongoose";

const getBorrowRecords = async () => {
    const borrowRecords = await BorrowRecord.find({});
    return borrowRecords.map(record => record.toObject());
};

const getBorrowRecordByBook = async (bookId: string) => {
    const borrowRecords = await BorrowRecord.find({book_id: bookId});
    return borrowRecords.map(record => record.toObject());
};

const getBorrowRecordByUser = async (userId: string) => {
    const borrowRecords = await BorrowRecord.find({user_id: userId});
    return borrowRecords.map(record => record.toObject());
};

const borrowBook = async (
    userId: string,
    bookId: string,
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    BorrowRecord.create(
        [{
            user_id: userId,
            book_id: bookId,
        }],
        {session},
    )
        .then(async () => {
            return Book.findByIdAndUpdate(
                bookId,
                {status: "borrowed"},
                {new: true, session},
            );
        })
        .then(async (updatedBook) => {
            if (!updatedBook) {
                throw new Error("No book found with the given ID.");
            }

            await session.commitTransaction();
            await session.endSession();
        })
        .catch(async (err) => {
            await session.abortTransaction();
            await session.endSession();
            throw err;
        });
};

const returnBook = async (
    borrowRecordId: string,
    bookId: string,
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    BorrowRecord.findOneAndUpdate(
        {
            _id: borrowRecordId,
            book_id: bookId,
            returned_date: {$exists: false},
        },
        {returned_date: new Date()},
        {new: true, session},
    )
        .then((borrowRecord) => {
            if (!borrowRecord) {
                throw new Error("No matching borrow record found or the book is already returned.");
            }

            return Book.findByIdAndUpdate(
                bookId,
                {status: "available"},
                {new: true, session},
            );
        })
        .then(async (updatedBook) => {
            if (!updatedBook) {
                throw new Error("No book found with the given ID.");
            }
            await session.commitTransaction();
            await session.endSession();
        })
        .catch(async (err) => {
            await session.abortTransaction().then(() => {
                session.endSession();
            });
            throw err;
        });
};

export default {
    getBorrowRecords,
    getBorrowRecordByBook,
    getBorrowRecordByUser,
    borrowBook,
    returnBook,
};
