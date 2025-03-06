import {Request} from "express";

interface BookRequest extends Request {
    body: {
        title: string
    };
}

export {BookRequest};
