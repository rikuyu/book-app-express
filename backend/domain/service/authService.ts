import User, { IUser } from "../model/user";
import { NotFoundError } from "../../shared/error/notFoundError";
import * as userService from "./userService";
import * as emailService from "./emailService";
import { Document } from "mongoose";
import crypto from "crypto";
import { InternalServerError } from "../../shared/error/internalServerError";
import { AuthError } from "../../shared/error/authError";

export const register = async (user: {
    name: string;
    email: string;
    password: string;
}): Promise<IUser> => await User.create(user);

export const login = async (credentials: {
    email: string;
    password: string;
}): Promise<IUser> => {
    const user = await User.findOne({ email: credentials.email }).select("name password");
    if (!user) {
        throw new NotFoundError(
            `No user found with the given email: ${credentials.email}`
        );
    }
    const isValid = await user.matchPassword(credentials.password);
    if (!isValid) {
        throw new AuthError(`Invalid password: ${credentials.password}`);
    }
    return user;
};

export const forgotPassword = async (email: string): Promise<string> => {
    const user = (await userService.getUserByEmail(email)) as IUser & Document;
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const resetToken = user.generateResetPasswordToken();
    await user.save();

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const subject = "Reset Password Email";
    const description = `Email send to ${email} from ${process.env.SENDER_EMAIL}.\n\nPlease copy & paste the token below to reset your password.\n\n${hashedToken}`;

    try {
        await emailService.sendEmail(email, subject, description);
        console.log("📧 Email send successfully");
        return user.name;
    } catch (e) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        throw e;
    }
};

export const resetPassword = async (
    hashedToken: string,
    newPassword: string
): Promise<IUser> => {
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new InternalServerError("Invalid or expired reset token");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    return await user.save();
};
