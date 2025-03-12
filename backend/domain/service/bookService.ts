import Book, {IBook} from "../model/book";
import {NotFoundError} from "../../shared/error/notFoundError";

export const getBooks = (): Promise<IBook[]> => Book.find({});

export const getBookById = async (id: string): Promise<IBook> => {
    const book = await Book.findById(id).exec();
    if (book == null) {
        throw new NotFoundError(`No book found with the given id: ${id}`, 404);
    }
    return book;
};

export const createBook = async (book: { title: string }): Promise<IBook> => await Book.create(book);

export const deleteBook = async (id: string): Promise<IBook> => {
    const book = await Book.findOneAndDelete({_id: id}).exec();
    if (book == null) {
        throw new NotFoundError(`No book found with the given id: ${id}`, 404);
    }
    return book;
};
