import {asyncHandler} from "../../shared/error/asyncHandler";
import {NextFunction, Request, Response} from "express";
import {AuthError} from "../../shared/error/authError";
import jwt, {JwtPayload} from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: JwtPayload | string;
}

export const verifyJwt = asyncHandler(async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        throw new AuthError("Invalid authorization header");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new AuthError("token not found in authorization header");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(`🔐 valid token ${decoded}`);
        req.user = decoded;

        next();
    } catch (e) {
        throw new AuthError("Invalid Json Web Token");
    }
    next();
});