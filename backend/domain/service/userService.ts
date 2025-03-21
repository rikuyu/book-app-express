import User, { IUser } from "../model/user";
import { NotFoundError } from "../../shared/error/notFoundError";

export const getMe = async (id: string): Promise<IUser> => {
    const me = await User.findById(id);
    if (!me) {
        throw new NotFoundError(`My data not found`);
    }
    return me;
};

export const getUsers = (): Promise<IUser[]> => User.find({});

export const getUserById = async (id: string): Promise<IUser> => {
    const user = await User.findById(id).exec();
    if (!user) {
        throw new NotFoundError(`No user found with the given id: ${id}`);
    }
    return user;
};

export const getUserByEmail = async (email: string): Promise<IUser> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError(`No user found with the given email: ${email}`);
    }
    return user;
};

export const deleteUser = async (id: string): Promise<IUser> => {
    const user = await User.findOneAndDelete({ _id: id }).exec();
    if (user == null) {
        throw new NotFoundError(`No user found with the given id: ${id}`);
    }
    return user;
};
