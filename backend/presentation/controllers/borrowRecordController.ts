import {Response, Request} from "express";
import * as service from "../../domain/service/borrowRecordService";
import {BorrowBookRequest, ReturnBookRequest} from "../types/request";
import {asyncHandler} from "../../shared/error/asyncHandler";

const getAllBorrowRecords = asyncHandler(async (
    _req: Request,
    res: Response,
): Promise<void> => {
    const allBorrowRecords = await service.getBorrowRecords();
    res.status(200).json(allBorrowRecords);
});

const getBorrowRecordsByBook = asyncHandler(async (
    req: Request<{ bookId: string }>,
    res: Response,
): Promise<void> => {
    const borrowRecords = await service.getBorrowRecordsByBook(req.params.bookId);
    res.status(200).json(borrowRecords);
});

const getBorrowRecordsByUser = asyncHandler(async (
    req: Request<{ userId: string }>,
    res: Response,
): Promise<void> => {
    const borrowRecords = await service.getBorrowRecordsByUser(req.params.userId);
    res.status(200).json(borrowRecords);
});

const borrowBook = asyncHandler(async (
    req: BorrowBookRequest,
    res: Response,
): Promise<void> => {
    await service.borrowBook(req.userId, req.body.bookId);
    res.status(204).send("success");
});

const returnBook = asyncHandler(async (
    req: ReturnBookRequest,
    res: Response,
): Promise<void> => {
    await service.returnBook(req.userId, req.body.bookId);
    res.status(204).send("success");
});

export {
    getAllBorrowRecords,
    getBorrowRecordsByBook,
    getBorrowRecordsByUser,
    borrowBook,
    returnBook,
};
