import {asyncHandler} from "../../shared/error/asyncHandler";
import {NextFunction, Request, Response} from "express";
import {RegisterRequest, LoginRequest} from "../types/request";
import * as authService from "../../domain/service/authService";
import * as userService from "../../domain/service/userService";

export const register = asyncHandler(async (req: RegisterRequest, res: Response) => {
    const user = await authService.register(req.body);

    const token = user.getJsonWebToken();

    res.status(200).json({
        message: `${user.name} created successfully`,
        token,
    });
});

export const login = asyncHandler(async (req: LoginRequest, res: Response, next: NextFunction) => {
    const user = await userService.getUserByEmail(req.body.email);
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("logout");
});
