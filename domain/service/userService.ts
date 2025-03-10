import User, {IUser} from "../model/user";

export const getUsers = (): Promise<IUser[]> => User.find({});

export const getUserById = async (id: string): Promise<IUser> => await User.findById(id).exec();

export const createUser = async (user: { name: string, email: string }): Promise<IUser> => await User.create(user);

export const deleteUser = async (id: string): Promise<IUser> => await User.findOneAndDelete({_id: id}).exec();
