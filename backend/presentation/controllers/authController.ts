import {asyncHandler} from "../../shared/error/asyncHandler";
import {Request, Response} from "express";
import {ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest} from "../types/request";
import * as authService from "../../domain/service/authService";
import * as emailService from "../../domain/service/emailService";
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

export const forgotPassword = asyncHandler(async (req: ForgotPasswordRequest, res: Response) => {
    const userName = await authService.forgotPassword(req.body.email);
    res
        .status(200)
        .send(`email send to ${userName}`);
});

export const resetPassword = asyncHandler(async (req: ResetPasswordRequest, res: Response) => {
    const user = await authService.resetPassword(req.params.token, req.body.newPassword);
    sendTokenResponse(user, 200, `reset password successfully`, res);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).send("logout");
});

export const sendEmail = asyncHandler(async (req: ForgotPasswordRequest, res: Response) => {
    await emailService.sendEmail(
        req.body.email,
        req.body.subject,
        req.body.text,
    );
    res.status(200).send("email send");
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
        httpOnly: false,
    };
    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({message, token});
};
