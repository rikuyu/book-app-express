import { CustomError } from "./customError";

export class BadRequestError extends Error implements CustomError {
    public readonly statusCode: number = 400;

    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
    }
}
