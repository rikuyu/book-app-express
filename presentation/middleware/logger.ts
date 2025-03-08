import {NextFunction, Request, Response} from "express";

const logger = (req: Request, _res: Response, next: NextFunction): void => {
    console.log(`⭐ [${req.method}] ${req.protocol}://${req.hostname}/${req.url}`);
    next();
};

export default logger;