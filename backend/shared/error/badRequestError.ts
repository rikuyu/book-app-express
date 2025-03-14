export class BadRequestError extends Error {
    public readonly statusCode: number = 404;

    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
    }
}
