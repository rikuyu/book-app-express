import {Request} from "express";

interface BookRequest extends Request {
    body: {
        title: string
    };
}

interface RegisterRequest extends Request {
    body: {
        name: string
        email: string
        password: string
    };
}

interface LoginRequest extends Request {
    body: {
        name: string
        password: string
    };
}

interface BorrowRecordRequest extends Request {
    body: {
        userId: string
        bookId: string
    };
}

export {BookRequest, RegisterRequest, LoginRequest, BorrowRecordRequest};
