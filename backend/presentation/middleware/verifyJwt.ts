import {asyncHandler} from "../../shared/error/asyncHandler";
import {NextFunction, Request, Response} from "express";
import {AuthError} from "../../shared/error/authError";
import jwt, {JwtPayload} from "jsonwebtoken";

interface CustomPayload extends JwtPayload {
    id: string;
}

export const verifyJwt = asyncHandler(async (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const cookie = req.headers.cookie;
    if (!cookie) {
        throw new AuthError("cookie not found in header");
    }
    const token = cookie.split("=")[1];
    if (!token) {
        throw new AuthError("token not found in cookie");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as CustomPayload;
        req.userId = decoded.id;
        next();
    } catch (e) {
        throw new AuthError("Invalid Json Web Token");
    }
});