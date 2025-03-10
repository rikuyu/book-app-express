import {NextFunction, Request, Response} from "express";
import {default as service} from "../../domain/service/userService";
import {UserRequest} from "../types/request";

const getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await service.getUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await service.getUserById(req.params.id);

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
        const user = await service.createUser(req.body);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const user = await service.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export {getUsers, getUserById, createUser, deleteUser};
