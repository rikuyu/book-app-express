import {Response, Request, NextFunction} from "express";
import BorrowRecordService from "../../domain/service/BorrowRecordService";

const getAllBorrowRecords = async (
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const allBorrowRecords = BorrowRecordService.getBorrowRecords();
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
    req: Request<{ userId: string, bookId: string }>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        await BorrowRecordService.borrowBook(req.body);
        res.status(204);
    } catch (e) {
        next(e);
    }
};

const returnBook = async (
    req: Request<{ userId: string, bookId: string }>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const {userId, bookId} = req.params;
        await BorrowRecordService.returnBook(userId, bookId);
        res.status(204);
    } catch (e) {
        next(e);
    }
};