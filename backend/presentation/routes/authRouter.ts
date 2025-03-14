import express from "express";
import {register, login, logout} from "../controllers/authController";

export const authRouter = express.Router();

authRouter.get("/register", register);
authRouter.get("/login", login);
authRouter.get("/logout", logout);
