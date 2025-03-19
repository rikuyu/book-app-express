import { CustomError } from "./customError";

export class InternalServerError extends Error implements CustomError {
    public readonly statusCode: number = 500;

    constructor(message: string) {
        super(message);
        this.name = "InternalServerError";
    }
}
