import {Request} from "express";

interface BookRequest extends Request {
    body: {
        title: string
    };
}

interface UserRequest extends Request {
    body: {
        name: string
        email: string
    };
}

interface BorrowRecordRequest extends Request {
    body: {
        userId: string
        bookId: string
    };
}

export {BookRequest, UserRequest, BorrowRecordRequest};
