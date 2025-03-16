import {Request} from "express";

export interface BookRequest extends Request {
    body: {
        title: string
    };
}

export interface RegisterRequest extends Request {
    body: {
        name: string
        email: string
        password: string
    };
}

export interface LoginRequest extends Request {
    body: {
        email: string
        password: string
    };
}

export interface BorrowBookRequest extends Request {
    body: {
        bookId: string
    };
}

export interface ReturnBookRequest extends Request {
    body: { 
        borrowRecordId: string
        bookId: string
    };
}
