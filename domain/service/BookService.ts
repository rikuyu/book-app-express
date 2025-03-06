import Book from "../model/Book";

const getBooks = () => {
    return Book.find({});
};

const getBookById = async (id: string) => {
    return await Book.findById(id).exec();
};

const createBook = async (bookData: { title: string }) => {
    return await Book.create(bookData);
};

const deleteBook = async (id: string) => {
    return await Book.findOneAndDelete({_id: id}).exec();
};

export default {getBooks, getBookById, createBook, deleteBook};
