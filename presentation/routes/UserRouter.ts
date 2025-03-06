import express from "express";
import {createUser, deleteUser, getUserById, getUsers} from "../controllers/UserController";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);
