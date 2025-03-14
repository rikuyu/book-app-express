import {asyncHandler} from "../../shared/error/asyncHandler";
import {Request, Response, NextFunction} from "express";

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("register")
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("login")
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("logout")
});
