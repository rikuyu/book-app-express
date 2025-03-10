import Book, {IBook} from "../model/book";

const getBooks = (): Promise<IBook[]> => Book.find({});

const getBookById = async (id: string): Promise<IBook> => await Book.findById(id).exec();

const createBook = async (book: { title: string }): Promise<IBook> => await Book.create(book);

const deleteBook = async (id: string): Promise<IBook> => await Book.findOneAndDelete({_id: id}).exec();

export default {
    getBooks,
    getBookById,
    createBook,
    deleteBook,
};
