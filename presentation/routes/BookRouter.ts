import express from "express";
import {createBook, deleteBook, getBookById, getBooks} from "../controllers/BookController";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", createBook);
bookRouter.delete("/:id", deleteBook);
