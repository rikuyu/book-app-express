export class NotFoundError extends Error {
    public readonly statusCode: number = 400;

    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}
