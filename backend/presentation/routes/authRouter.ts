import express from "express";
import {register, login, logout, resetPassword, sendEmail} from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/reset_password", resetPassword);
authRouter.get("/logout", logout);

authRouter.post("/email", sendEmail)
