import express from "express";
import {deleteUser, getUserById, getUsers} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
