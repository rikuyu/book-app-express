import Book, {IBook} from "../model/book";
import {NotFoundError} from "../../shared/error/notFoundError";
import BorrowRecord from "../model/borrowRecord";

export const getBooks = (): Promise<IBook[]> => Book.find({});

export const getBookById = async (id: string): Promise<IBook> => {
    const book = await Book.findById(id).exec();
    if (book == null) {
        throw new NotFoundError(`No book found with the given id: ${id}`);
    }
    return book;
};

export const getPopularBooks = async (): Promise<IBook[]> => {
    const popularBooks = await BorrowRecord.aggregate([
        {$group: {_id: "$book_id", count: {$sum: 1}}},
        {$lookup: {from: "books", localField: "_id", foreignField: "_id", as: "book"}},
        {$unwind: "$book"},
        {$sort: {count: -1}},
        {$limit: 5},
        {$project: {id: "$book._id", title: "$book.title"}},
    ]);
    if (popularBooks.length == 0) {
        throw new NotFoundError("No popular books found");
    }
    return popularBooks;
};

export const createBook = async (book: { title: string }): Promise<IBook> => await Book.create(book);

export const deleteBook = async (id: string): Promise<IBook> => {
    const book = await Book.findOneAndDelete({_id: id}).exec();
    if (book == null) {
        throw new NotFoundError(`No book found with the given id: ${id}`);
    }
    return book;
};
