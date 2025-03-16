import { CustomError } from "./customError";

export class AuthError extends Error implements CustomError {
    public readonly statusCode: number = 401;

    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}
