import {describe, expect, it, vi} from "vitest";
import {NextFunction, Request, Response} from "express";
import {createBook, deleteBook, getBookById, getBooks} from "../bookController";
import * as service from "../../../domain/service/bookService";
import {IBook} from "../../../domain/model/book";
import {BookRequest} from "../../types/request";

describe("bookController Test", () => {
    describe("getBooks", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});
        const res = {status: statusMock} as unknown as Response;

        it("success with 200 & books", async () => {
            const mockBooks: Partial<IBook>[] = [
                {title: "Book 1", status: "available"},
                {title: "Book 2", status: "borrowed"},
            ];

            vi.spyOn(service, "getBooks").mockResolvedValue(mockBooks as IBook[]);

            await getBooks({} as Request, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockBooks);
        });

        it("fail with error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "getBooks").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await getBooks({} as Request, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getBookById", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});

        const req = {params: {id: "1"}} as Request<{ id: string }>;
        const res = {status: statusMock} as unknown as Response;

        it("success with 200 & a book", async () => {
            const mockBook: Partial<IBook> = {title: "Book 1", status: "available"};

            vi.spyOn(service, "getBookById").mockResolvedValue(mockBook as IBook);

            await getBookById(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockBook);
        });

        it("fail with not found error", async () => {
            vi.spyOn(service, "getBookById").mockResolvedValue(null);

            await getBookById(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(404);
        });

        it("fail with unknown error", async () => {
            const error = new Error("Internal Server Error");
            vi.spyOn(service, "getBookById").mockRejectedValue(error);

            const next = vi.fn() as NextFunction;
            await getBookById(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("createBook", () => {

        const bookTitle = "TestBook";
        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});

        const req: BookRequest = {
            body: {
                title: bookTitle,
            },
        } as Request<{ id: string }>;
        const res = {status: statusMock} as unknown as Response;

        it("success with 201", async () => {
            const mockBook: Partial<IBook> = {title: bookTitle, status: "available"};

            vi.spyOn(service, "createBook").mockResolvedValue(mockBook as IBook);

            await createBook(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(mockBook);
        });

        it("fail with unknown error", async () => {
            const err = new Error("Internal Server Error");
            vi.spyOn(service, "createBook").mockRejectedValue(err);

            const next = vi.fn() as NextFunction;
            await createBook(req, res, next);

            expect(next).toHaveBeenCalledWith(err);
        });
    });

    describe("deleteBook", () => {

        const jsonMock = vi.fn();
        const statusMock = vi.fn().mockReturnValue({json: jsonMock});

        const req = {params: {id: "1"}} as Request<{ id: string }>;
        const res = {status: statusMock} as unknown as Response;

        it("success with 200", async () => {
            const mockBook: Partial<IBook> = {title: "Book 1", status: "available"};

            vi.spyOn(service, "deleteBook").mockResolvedValue(mockBook as IBook);

            await deleteBook(req, res, vi.fn);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockBook);
        });

        it("fail with error", async () => {
            vi.spyOn(service, "deleteBook").mockResolvedValue(null);

            await deleteBook(req, res, vi.fn());

            expect(statusMock).toHaveBeenCalledWith(404);
        });

        it("fail with unknown error", async () => {
            const err = new Error("Internal Server Error");
            vi.spyOn(service, "deleteBook").mockRejectedValue(err);

            const next = vi.fn() as NextFunction;
            await deleteBook(req, res, next);

            expect(next).toHaveBeenCalledWith(err);
        });
    });
});
