import express from "express";
import {register, login, logout, resetPassword, sendEmail, forgotPassword} from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/reset_password", forgotPassword);
authRouter.put("/reset_password/:token", resetPassword);
authRouter.post("/logout", logout);

authRouter.post("/email", sendEmail);
