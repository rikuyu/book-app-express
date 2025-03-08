import BorrowRecord from "../model/BorrowRecord";
import Book from "../model/Book";
import mongoose from "mongoose";

const getBorrowRecords = () => BorrowRecord.find({});

const getBorrowRecordByBook = async (bookId: string) => await Book.find({book_id: bookId});

const getBorrowRecordByUser = async (userId: string) => await Book.find({user_id: userId});

const borrowBook = async (
    borrowRecord: { user_id: string; book_id: string },
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    BorrowRecord.create(
        [{
            user_id: borrowRecord.user_id,
            book_id: borrowRecord.book_id,
        }],
        {session},
    )
        .then(async (newRecord) => {
            return Book.findByIdAndUpdate(
                borrowRecord.book_id,
                {status: "BORROWED"},
                {new: true, session},
            );
        })
        .then(async (updatedBook) => {
            if (!updatedBook) {
                return new Error("No book found with the given ID.");
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
    userId: string,
    bookId: string,
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    BorrowRecord.findOneAndUpdate(
        {
            user_id: userId,
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
                {status: "AVAILABLE"},
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
