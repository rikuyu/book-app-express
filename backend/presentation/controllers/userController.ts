import { Request, Response } from "express";
import * as service from "../../domain/service/userService";
import { asyncHandler } from "../../shared/error/asyncHandler";
import { BadRequestError } from "../../shared/error/badRequestError";

const getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const me = await service.getMe(req.userId);
    res.status(200).json(me);
});

const getUsers = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const users = await service.getUsers();
    res.status(200).json(users);
});

const getUserById = asyncHandler(
    async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const user = await service.getUserById(req.params.id);
        res.status(200).json(user);
    }
);

const deleteUser = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const user = await service.deleteUser(req.params.id);
    res.status(200).json(user);
});

const uploadProfileImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestError("No file was uploaded");
    }
    res.status(200).json({ message: "upload successfully" });
});

export { getUsers, getUserById, deleteUser, getMe, uploadProfileImage };
