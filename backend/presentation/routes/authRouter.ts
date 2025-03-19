import express from "express";
import {register, login, logout, resetPassword} from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/reset_password", resetPassword);
authRouter.get("/logout", logout);
