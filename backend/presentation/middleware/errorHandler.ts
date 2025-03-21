import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../shared/error/customError";

const errorHandler = (
    err: CustomError,
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.status(err.statusCode ?? 500).json({
        error: err.name,
        message: err.message ?? "Internal Server Error",
    });
    next();
};

export default errorHandler;
