import { describe, expect, it, vi } from "vitest";
import * as service from "../borrowRecordService";
import BorrowRecord, { IBorrowRecord } from "../../model/borrowRecord";
import mongoose from "mongoose";
import { InternalServerError } from "../../../shared/error/internalServerError";

describe("borrowRecordService", () => {
    const mockRecord: Partial<IBorrowRecord> = {
        user_id: new mongoose.Types.ObjectId(),
        book_id: new mongoose.Types.ObjectId(),
        borrowed_date: new Date(),
    };

    describe("getBorrowRecords", () => {
        it("success", async () => {
            const mockToObject = vi.fn().mockReturnValue(mockRecord);
            vi.spyOn(BorrowRecord, "find").mockResolvedValue([
                { toObject: mockToObject } as unknown as mongoose.Document,
            ]);

            const result = await service.getBorrowRecords();
            expect(result[0]).toEqual(mockRecord);
        });

        it("fail with InternalServerError", async () => {
            vi.spyOn(BorrowRecord, "find").mockRejectedValue(
                new InternalServerError("DB Error")
            );
            await expect(service.getBorrowRecords()).rejects.toThrow(InternalServerError);
        });
    });

    describe("getBorrowRecordsByBook", () => {
        it("success", async () => {
            const mockToObject = vi.fn().mockReturnValue(mockRecord);
            vi.spyOn(BorrowRecord, "find").mockResolvedValue([
                { toObject: mockToObject } as unknown as mongoose.Document,
            ]);

            const result = await service.getBorrowRecordsByBook("bookId");
            expect(result[0]).toEqual(mockRecord);
        });

        it("fail with InternalServerError", async () => {
            vi.spyOn(BorrowRecord, "find").mockRejectedValue(
                new InternalServerError("DB Error")
            );
            await expect(service.getBorrowRecordsByBook("bookId")).rejects.toThrow(
                InternalServerError
            );
        });
    });

    describe("getBorrowRecordsByUser", () => {
        it("success", async () => {
            const mockToObject = vi.fn().mockReturnValue(mockRecord);
            vi.spyOn(BorrowRecord, "find").mockResolvedValue([
                { toObject: mockToObject } as unknown as mongoose.Document,
            ]);

            const result = await service.getBorrowRecordsByUser("userId");
            expect(result[0]).toEqual(mockRecord);
        });

        it("fail with InternalServerError", async () => {
            vi.spyOn(BorrowRecord, "find").mockRejectedValue(
                new InternalServerError("DB Error")
            );
            await expect(service.getBorrowRecordsByUser("userId")).rejects.toThrow(
                InternalServerError
            );
        });
    });

    describe("borrowBook", () => {
        it("fail with BadRequestError if bookId missing", async () => {
            await expect(service.borrowBook("userId", "")).rejects.toThrowError(
                "book id undefined"
            );
        });

        it("fail with BadRequestError if userId missing", async () => {
            await expect(service.borrowBook("", "bookId")).rejects.toThrowError(
                "user id undefined"
            );
        });
    });

    describe("returnBook", () => {
        it("fail with BadRequestError if bookId missing", async () => {
            await expect(service.returnBook("userId", "")).rejects.toThrowError(
                "book id undefined"
            );
        });

        it("fail with BadRequestError if userId missing", async () => {
            await expect(service.returnBook("", "bookId")).rejects.toThrowError(
                "user id undefined"
            );
        });
    });
});
