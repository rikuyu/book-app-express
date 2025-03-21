import express from "express";
import { deleteUser, getMe, getUserById, getUsers } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getMe);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
