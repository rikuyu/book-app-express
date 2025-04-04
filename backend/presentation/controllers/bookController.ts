import { Request, Response } from "express";
import * as service from "../../domain/service/bookService";
import { BookRequest, SearchBookRequest } from "../types/request";
import { asyncHandler } from "../../shared/error/asyncHandler";

const getBooks = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const books = await service.getBookData(req.userId);
    res.status(200).json(books);
});

const getBookById = asyncHandler(
    async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const book = await service.getBookById(req.params.id);
        res.status(200).json(book);
    }
);

const getPopularBooks = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
        const popularBooks = await service.getPopularBooks();
        res.status(200).json(popularBooks);
    }
);

const getSearchedBooks = asyncHandler(
    async (req: SearchBookRequest, res: Response): Promise<void> => {
        const books = await service.searchBooks(req.query.keyword);
        res.status(200).json(books);
    }
);

const createBook = asyncHandler(
    async (req: BookRequest, res: Response): Promise<void> => {
        const book = await service.createBook(req.body);
        res.status(201).json(book);
    }
);

const deleteBook = asyncHandler(
    async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const book = await service.deleteBook(req.params.id);
        res.status(200).json(book);
    }
);

export {
    getBooks,
    getBookById,
    createBook,
    deleteBook,
    getPopularBooks,
    getSearchedBooks,
};
