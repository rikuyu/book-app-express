import {Response, Request, NextFunction} from "express";
import BorrowRecordService from "../../domain/service/BorrowRecordService";
import {BorrowRecordRequest} from "../types/Request";

const getAllBorrowRecords = async (
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const allBorrowRecords = await BorrowRecordService.getBorrowRecords();
        res.status(200).json(allBorrowRecords);
    } catch (e) {
        next(e);
    }
};

const getBorrowRecordsByBook = async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const borrowRecords = await BorrowRecordService.getBorrowRecordByUser(req.params.userId);
        res.status(200).json(borrowRecords);
    } catch (e) {
        next(e);
    }
};

const getBorrowRecordsByUser = async (
    req: Request<{ bookId: string }>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const borrowRecords = await BorrowRecordService.getBorrowRecordByBook(req.params.bookId);
        res.status(200).json(borrowRecords);
    } catch (e) {
        next(e);
    }
};

const borrowBook = async (
    req: BorrowRecordRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        await BorrowRecordService.borrowBook(req.body.userId, req.body.bookId);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
};

const returnBook = async (
    req: Request<{ borrowRecordId: string, bookId: string }>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const {borrowRecordId, bookId} = req.params;
        await BorrowRecordService.returnBook(borrowRecordId, bookId);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
};

export {
    getAllBorrowRecords,
    getBorrowRecordsByBook,
    getBorrowRecordsByUser,
    borrowBook,
    returnBook,
};
