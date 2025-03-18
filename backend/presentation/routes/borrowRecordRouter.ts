import express from "express";
import {
    getAllBorrowRecords,
    getBorrowRecordsByBook,
    getBorrowRecordsByUser,
    borrowBook,
    returnBook,
} from "../controllers/borrowRecordController";

export const borrowRecordRouter = express.Router();

borrowRecordRouter.get("/", getAllBorrowRecords);
borrowRecordRouter.get("/books", getBorrowRecordsByBook);
borrowRecordRouter.get("/users", getBorrowRecordsByUser);
borrowRecordRouter.post("/", borrowBook);
borrowRecordRouter.put("/return", returnBook);
