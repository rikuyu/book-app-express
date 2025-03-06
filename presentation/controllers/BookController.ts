import {NextFunction, Request, Response} from "express";
import BookService from "../../domain/service/BookService";
import {BookRequest} from "../types/Request";

const getBooks = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const books = await BookService.getBooks();
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

const getBookById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const book = await BookService.getBookById(req.params.id);
        if (book == null) {
            res.status(404).json(`Not Found _id:${req.params.id}`);
            return;
        }
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

const createBook = async (req: BookRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const book = await BookService.createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};

const deleteBook = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const book = await BookService.deleteBook(req.params.id);
        if (book === null) {
            res.status(404).json(`Not Found _id:${req.params.id} is not exist`);
            return;
        }
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

export {getBooks, getBookById, createBook, deleteBook};
