import { describe, expect, it, vi } from 'vitest';
import * as service from '../bookService';
import Book, { IBook } from '../../model/book';
import BorrowRecord from '../../model/borrowRecord';
import { NotFoundError } from '../../../shared/error/notFoundError';
import { InternalServerError } from '../../../shared/error/internalServerError';
import { Types } from 'mongoose';

describe("bookService Test", () => {
    const mockBook1: Partial<IBook> = { title: "testBook1", status: "available" };
    const mockBook2: Partial<IBook> = { title: "testBook2", status: "available" };
    const mockBooks: Partial<IBook>[] = [mockBook1, mockBook2];

    describe("getBooks", () => {
        it("success", async () => {
            vi.spyOn(Book, "find").mockResolvedValue(mockBooks);
            const actualBooks = await service.getBooks();
            expect(actualBooks.length).toBe(2);
            expect(actualBooks[0].title).toBe(mockBook1.title);
        });

        it("fail", async () => {
            vi.spyOn(Book, "find").mockRejectedValue(new Error("failed"));
            await expect(service.getBooks()).rejects.toThrowError();
        });
    });

    describe("getBookById", () => {
        it("success", async () => {
            const execMock = vi.fn().mockResolvedValue(mockBook1);
            const findByIdMock = vi.fn().mockReturnValue({ exec: execMock });
            vi.spyOn(Book, "findById").mockImplementation(findByIdMock);

            const actual = await service.getBookById("id");
            expect(actual.title).toBe(mockBook1.title);
        });

        it("fail with NotFoundError", async () => {
            const execMock = vi.fn().mockResolvedValue(null);
            const findByIdMock = vi.fn().mockReturnValue({ exec: execMock });
            vi.spyOn(Book, "findById").mockImplementation(findByIdMock);

            await expect(service.getBookById("id")).rejects.toThrow(NotFoundError);
        });
    });

    describe("getPopularBooks", () => {
        it("success", async () => {
            vi.spyOn(BorrowRecord, "aggregate").mockResolvedValue(mockBooks);

            const result = await service.getPopularBooks();

            expect(result.length).toBe(2);
            expect(result[0].title).toBe(mockBook1.title);
        });

        it("fail with NotFoundError", async () => {
            vi.spyOn(BorrowRecord, "aggregate").mockResolvedValue([]);
            await expect(service.getPopularBooks()).rejects.toThrow(NotFoundError);
        });
    });

    describe("searchBooks", () => {
        it("success", async () => {
            vi.spyOn(Book, "find").mockResolvedValue(mockBooks);
            const result = await service.searchBooks("test");
            expect(result.length).toBe(2);
        });

        it("fail with NotFoundError", async () => {
            vi.spyOn(Book, "find").mockRejectedValue(new NotFoundError("fail"));
            await expect(service.searchBooks("fail")).rejects.toThrow(NotFoundError);
        });
    });

    describe("createBook", () => {
        it("success", async () => {
            const newBook: Awaited<ReturnType<typeof Book.create>> = {
                _id: new Types.ObjectId(),
                title: 'new book',
                status: 'available',
            } as unknown as Awaited<ReturnType<typeof Book.create>>;

            vi.spyOn(Book, "create").mockResolvedValue(newBook);
            const result = await service.createBook({ title: "new book" });
            expect(result.title).toBe("new book");
            expect(result.status).toBe("available");
        });

        it("fail with InternalServerError", async () => {
            vi.spyOn(Book, "create").mockRejectedValue(new InternalServerError(""));
            await expect(service.createBook({ title: "test" })).rejects.toThrow(
                InternalServerError
            );
        });
    });

    describe("deleteBook", () => {
        it("success", async () => {
            const execMock = vi.fn().mockResolvedValue(mockBook1);
            const findOneAndDeleteMock = vi.fn().mockReturnValue({ exec: execMock });
            vi.spyOn(Book, "findOneAndDelete").mockImplementation(findOneAndDeleteMock);

            const result = await service.deleteBook("id");
            expect(result.title).toBe(mockBook1.title);
        });

        it("fail with NotFoundError", async () => {
            const execMock = vi.fn().mockResolvedValue(null);
            const findOneAndDeleteMock = vi.fn().mockReturnValue({ exec: execMock });
            vi.spyOn(Book, "findOneAndDelete").mockImplementation(findOneAndDeleteMock);

            await expect(service.deleteBook("id")).rejects.toThrow(NotFoundError);
        });
    });
});
