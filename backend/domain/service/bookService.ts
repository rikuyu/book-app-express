import Book, {BookData, IBook} from "../model/book";
import {NotFoundError} from "../../shared/error/notFoundError";
import BorrowRecord from "../model/borrowRecord";

export const getBooks = (): Promise<IBook[]> => Book.find({});

export const getBookData = async (userId: string): Promise<BookData[]> => {
    const books = await Book.find().lean();

    const bookIds = books.map(book => book._id);

    const borrowRecords = await BorrowRecord.find({
        book_id: { $in: bookIds },
        returned_date: { $exists: false },
    }).lean();

    const borrowedByMap = new Map<string, string>();
    borrowRecords.forEach(record => {
        borrowedByMap.set(record.book_id.toString(), record.user_id.toString());
    });

    return books.map(book => {
        const borrowedBy = borrowedByMap.get(book._id.toString());
        const isBorrowedByMe = borrowedBy === userId;

        return {
            _id: book._id.toString(),
            title: book.title,
            status: book.status,
            isBorrowedByMe,
        };
    });
};

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

export const searchBooks = async (keyword: string): Promise<IBook[]> => {
    return Book.find({title: {$regex: keyword, $options: "i"}});
};

export const createBook = async (book: { title: string }): Promise<IBook> => await Book.create(book);

export const deleteBook = async (id: string): Promise<IBook> => {
    const book = await Book.findOneAndDelete({_id: id}).exec();
    if (book == null) {
        throw new NotFoundError(`No book found with the given id: ${id}`);
    }
    return book;
};
