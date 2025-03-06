import User from "../model/User";

const getUsers = () => User.find({});

const getUserById = async (id: string) => await User.findById(id).exec();

const createUser = async (user: { name: string, email: string }) => await User.create(user);

const deleteUser = async (id: string) => await User.findOneAndDelete({_id: id}).exec();

export default {getUsers, getUserById, createUser, deleteUser};