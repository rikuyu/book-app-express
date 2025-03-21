import { NextFunction, Request, Response } from "express";
import { port } from "../../app";

const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
    console.log(`⭐ [${req.method}] ${req.protocol}://${req.hostname}:${port}${req.url}`);
    next();
};

export default requestLogger;
