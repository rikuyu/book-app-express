import User, {IUser} from "../model/user";

export const register = async (
    user: {
        name: string,
        email: string,
        password: string,
    },
): Promise<IUser> => await User.create(user);