import express from "express";
import multer from "multer";
import {
    deleteUser,
    getMe,
    getUserById,
    getUsers,
    uploadProfileImage,
} from "../controllers/userController";
import { authAdmin } from "../middleware/authAdmin";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getMe);
userRouter.get("/:id", getUserById);

const upload = multer({
    dest: "../../uploads/",
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

userRouter.post("/image", upload.single("avatar"), uploadProfileImage);

userRouter.delete("/:id", authAdmin, deleteUser);
