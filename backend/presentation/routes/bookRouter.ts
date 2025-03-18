import express from "express";
import {
    createBook,
    deleteBook,
    getBookById,
    getBooks,
    getPopularBooks,
    getSearchedBooks,
} from "../controllers/bookController";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/popular", getPopularBooks);
bookRouter.get("/search", getSearchedBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", createBook);
bookRouter.delete("/:id", deleteBook);
