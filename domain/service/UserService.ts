import User, {IUser} from "../model/User";

const getUsers = (): Promise<IUser[]> => User.find({});

const getUserById = async (id: string): Promise<IUser> => await User.findById(id).exec();

const createUser = async (user: { name: string, email: string }): Promise<IUser> => await User.create(user);

const deleteUser = async (id: string): Promise<IUser> => await User.findOneAndDelete({_id: id}).exec();

export default {getUsers, getUserById, createUser, deleteUser};
