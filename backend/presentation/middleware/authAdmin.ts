import { Request, Response, NextFunction } from "express";
import { AuthError } from "../../shared/error/authError";

export const authAdmin = (req: Request, _res: Response, next: NextFunction) => {
    if (req.userRole !== "admin") {
        throw new AuthError("Admin privileges are required");
    }
    next();
};
