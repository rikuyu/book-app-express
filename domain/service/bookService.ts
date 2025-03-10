import Book, {IBook} from "../model/book";

export const getBooks = (): Promise<IBook[]> => Book.find({});

export const getBookById = async (id: string): Promise<IBook> => await Book.findById(id).exec();

export const createBook = async (book: { title: string }): Promise<IBook> => await Book.create(book);

export const deleteBook = async (id: string): Promise<IBook> => await Book.findOneAndDelete({_id: id}).exec();
