import {Request} from "express";

interface BookRequest extends Request {
    body: {
        title: string
    };
}

interface AuthRequest extends Request {
    body: {
        name: string
        email: string
        password: string
    };
}

interface BorrowRecordRequest extends Request {
    body: {
        userId: string
        bookId: string
    };
}

export {BookRequest, AuthRequest, BorrowRecordRequest};
