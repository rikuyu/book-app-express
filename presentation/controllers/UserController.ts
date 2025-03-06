import {NextFunction, Request, Response} from "express";
import UserService from "../../domain/service/UserService";
import {UserRequest} from "../types/Request";

const getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await UserService.getUserById(req.params.id);

        if (user == null) {
            res.status(404).json(`Not Found _id:${req.params.id}`);
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export {getUsers, getUserById, createUser, deleteUser};
