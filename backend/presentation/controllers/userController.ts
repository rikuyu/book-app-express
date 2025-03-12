import {Request, Response} from "express";
import * as service from "../../domain/service/userService";
import {UserRequest} from "../types/request";
import {asyncHandler} from "../../shared/error/asyncHandler";

const getUsers = asyncHandler(async (
    _req: Request,
    res: Response,
): Promise<void> => {
    const users = await service.getUsers();
    res.status(200).json(users);
});

const getUserById = asyncHandler(async (
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> => {
    const user = await service.getUserById(req.params.id);
    res.status(200).json(user);
});

const createUser = asyncHandler(async (
    req: UserRequest,
    res: Response,
): Promise<void> => {
    const user = await service.createUser(req.body);
    res.status(200).json(user);
});

const deleteUser = asyncHandler(async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const user = await service.deleteUser(req.params.id);
    res.status(200).json(user);
});

export {getUsers, getUserById, createUser, deleteUser};
