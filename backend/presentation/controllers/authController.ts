import {asyncHandler} from "../../shared/error/asyncHandler";
import {Request, Response, NextFunction} from "express";
import {AuthRequest} from "../types/request";
import * as service from "../../domain/service/authService";

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await service.register(req.body);
    res.status(200).json({
        message: `${user.name} created successfully`,
    });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("login");
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("logout");
});
