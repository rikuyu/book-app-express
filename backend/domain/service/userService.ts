import User, {IUser} from "../model/user";
import {NotFoundError} from "../../shared/error/notFoundError";

export const getUsers = (): Promise<IUser[]> => User.find({});

export const getUserById = async (id: string): Promise<IUser> => {
    const user = await User.findById(id).exec();
    if (user == null) {
        throw new NotFoundError(`No user found with the given id: ${id}`, 404);
    }
    return user;
};

export const createUser = async (user: { name: string, email: string }): Promise<IUser> => await User.create(user);

export const deleteUser = async (id: string): Promise<IUser> => {
    const user = await User.findOneAndDelete({_id: id}).exec();
    if (user == null) {
        throw new NotFoundError(`No user found with the given id: ${id}`, 404);
    }
    return user;
};
