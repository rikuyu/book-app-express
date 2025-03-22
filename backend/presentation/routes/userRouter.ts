import express from "express";
import multer from "multer";
import {
    deleteUser,
    getMe,
    getUserById,
    getUsers,
    uploadProfileImage,
} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getMe);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);

const upload = multer({
    dest: "../../uploads/",
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

userRouter.post("/image", upload.single("avatar"), uploadProfileImage);
