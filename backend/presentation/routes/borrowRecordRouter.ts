import express from "express";
import {
    getAllBorrowRecords,
    getBorrowRecordsByBook,
    getBorrowRecordsByUser,
    borrowBook,
    returnBook,
} from "../controllers/borrowRecordController";
import { authAdmin } from "../middleware/authAdmin";

export const borrowRecordRouter = express.Router();

borrowRecordRouter.post("/", borrowBook);
borrowRecordRouter.put("/return", returnBook);

borrowRecordRouter.get("/", authAdmin, getAllBorrowRecords);
borrowRecordRouter.get("/users", authAdmin, getBorrowRecordsByUser);
borrowRecordRouter.get("/books", authAdmin, getBorrowRecordsByBook);
