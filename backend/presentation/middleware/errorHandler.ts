import {NextFunction, Request, Response} from "express";

const errorHandler = (
    err: Error & { statusCode?: number },
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    res.status(err.statusCode ?? 500).json({
        name: err.name,
        message: err.message ?? "Internal Server Error",
    });
};

export default errorHandler;