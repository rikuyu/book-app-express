import User, {IUser} from "../model/user";
import {NotFoundError} from "../../shared/error/notFoundError";
import {BadRequestError} from "../../shared/error/badRequestError";
import * as userService from "./userService";
import {Document} from "mongoose";

export const register = async (
    user: {
        name: string,
        email: string,
        password: string,
    },
): Promise<IUser> => await User.create(user);

export const login = async (
    credentials: {
        email: string,
        password: string,
    },
): Promise<IUser> => {
    const user = await User.findOne({email: credentials.email}).select("name password");
    if (!user) {
        throw new NotFoundError(`No user found with the given email: ${credentials.email}`);
    }
    const isValid = await user.matchPassword(credentials.password);
    if (!isValid) {
        throw new BadRequestError(`Invalid password: ${credentials.password}`);
    }
    return user;
};

export const resetPassword = async (email: string): Promise<{ name: string, resetToken: string }> => {
    const user = await userService.getUserByEmail(email) as (IUser & Document);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const resetToken = user.generateResetPasswordToken();
    await user.save();
    return {name: user.name, resetToken: resetToken};
};