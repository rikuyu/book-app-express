import {asyncHandler} from "../../shared/error/asyncHandler";
import {Request, Response} from "express";
import {LoginRequest, RegisterRequest} from "../types/request";
import * as authService from "../../domain/service/authService";
import {IUser} from "../../domain/model/user";
import {CookieOptions} from "express-serve-static-core";

export const register = asyncHandler(async (req: RegisterRequest, res: Response) => {
    const user = await authService.register(req.body);
    sendTokenResponse(user, 200, `${user.name} registered successfully`, res);
});

export const login = asyncHandler(async (req: LoginRequest, res: Response) => {
    const user = await authService.login(req.body);
    sendTokenResponse(user, 200, `${user.name} login success`, res);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).send("logout");
});

const sendTokenResponse = (
    user: IUser,
    statusCode: number,
    message: string,
    res: Response,
) => {
    const token = user.getJsonWebToken();
    const oneHour = 60 * 60 * 1000;
    const options: CookieOptions = {
        expires: new Date(Date.now() + oneHour),
        httpOnly: true,
        secure: true,
    };
    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({
            message,
            token,
        });
};
