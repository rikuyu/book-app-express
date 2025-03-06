import Book from "../model/Book";

const getBooks = () => Book.find({});

const getBookById = async (id: string) => await Book.findById(id).exec();

const createBook = async (book: { title: string }) => await Book.create(book);

const deleteBook = async (id: string) => await Book.findOneAndDelete({_id: id}).exec();

export default {getBooks, getBookById, createBook, deleteBook};
