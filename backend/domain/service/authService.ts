import User, {IUser} from "../model/user";
import {NotFoundError} from "../../shared/error/notFoundError";
import {BadRequestError} from "../../shared/error/badRequestError";

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
    if (user == null) {
        throw new NotFoundError(`No user found with the given email: ${credentials.email}`);
    }
    const isValid = await user.matchPassword(credentials.password);
    if (!isValid) {
        throw new BadRequestError(`Invalid password: ${credentials.password}`);
    }
    return user;
};