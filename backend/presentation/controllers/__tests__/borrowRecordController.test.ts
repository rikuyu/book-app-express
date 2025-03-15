import {describe, expect, it, vi} from "vitest";
import mongoose from "mongoose";
import {NextFunction, Request, Response} from "express";
import {
    getAllBorrowRecords,
    getBorrowRecordsByBook,
    getBorrowRecordsByUser,
    borrowBook,
    returnBook,
} from "../borrowRecordController";
import * as service from "../../../domain/service/borrowRecordService";
import {IBorrowRecord} from "../../../domain/model/borrowRecord";
import {BorrowBookRequest, ReturnBookRequest} from "../../types/request";

describe("borrowRecordController Test", () => {
    describe("getAllBorrowRecords", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});
        const res = {status: statusMock} as unknown as Response;

        it("success with 200 & borrowRecords", async () => {
            const mockBorrowRecords: Partial<IBorrowRecord>[] = [
               {user_id: new mongoose.Types.ObjectId(), book_id: new mongoose.Types.ObjectId()}
            ];

            vi.spyOn(service, "getBorrowRecords").mockResolvedValue(mockBorrowRecords as IBorrowRecord[]);

            await getAllBorrowRecords({} as Request, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockBorrowRecords);
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "getBorrowRecords").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await getAllBorrowRecords({} as Request, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getBorrowRecordsByBook", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});

        const req = {params : {bookId: "1"} } as Request<{bookId: string}>;
        const res = {status: statusMock} as unknown as Response;

        it("success with 200 & borrowRecords", async () => {
            const mockBorrowRecords: Partial<IBorrowRecord>[] = [
               {user_id: new mongoose.Types.ObjectId(), book_id: new mongoose.Types.ObjectId()}
            ];

            vi.spyOn(service, "getBorrowRecordsByBook").mockResolvedValue(mockBorrowRecords as IBorrowRecord[]);

            await getBorrowRecordsByBook(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockBorrowRecords);
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "getBorrowRecordsByBook").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await getBorrowRecordsByBook(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getBorrowRecordsByUser", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});

        const req = {params : {userId: "1"} } as Request<{userId: string}>;
        const res = {status: statusMock} as unknown as Response;

        it("success with 200 & borrowRecords", async () => {
            const mockBorrowRecords: Partial<IBorrowRecord>[] = [
               {user_id: new mongoose.Types.ObjectId(), book_id: new mongoose.Types.ObjectId()}
            ];

            vi.spyOn(service, "getBorrowRecordsByUser").mockResolvedValue(mockBorrowRecords as IBorrowRecord[]);

            await getBorrowRecordsByUser(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockBorrowRecords);
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "getBorrowRecordsByUser").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await getBorrowRecordsByUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("borrowBook", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});

        const req = {body : {userId: "1", bookId: "1"} } as BorrowBookRequest;
        const res = {status: statusMock} as unknown as Response;

        it("success with 204", async () => {
            vi.spyOn(service, "borrowBook").mockResolvedValue(undefined);

            await borrowBook(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(204);
            expect(jsonMock).not.toHaveBeenCalled();
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "borrowBook").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await borrowBook(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("returnBook", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});

        const req = {body : {borrowRecordId: "1", bookId: "1"} } as ReturnBookRequest;
        const res = {status: statusMock} as unknown as Response;

        it("success with 204", async () => {
            vi.spyOn(service, "returnBook").mockResolvedValue(undefined);

            await returnBook(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(204);
            expect(jsonMock).not.toHaveBeenCalled();
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "returnBook").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await returnBook(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
