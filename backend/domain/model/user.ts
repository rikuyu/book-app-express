import mongoose, {Schema} from "mongoose";
import bcrypt, {genSalt} from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {NextFunction} from "express";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    role: "admin" | "user";

    getJsonWebToken(): string;

    matchPassword(password: string): Promise<boolean>;

    generateResetPasswordToken(): string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v: string) {
                const pattern = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return pattern.test(v);
            },
            message: (props: { value: string; }) => `${props.value} is not a valid email.`,
        },
    },
    password: {
        type: String,
        minlength: 3,
        required: true,
    },
    resetPasswordToken: {type: String},
    resetPasswordExpire: {type: Date},
    role: {
        type: String,
        enum: ["admin", "user"], default: "user",
    },
});

userSchema.pre("save", async function (next: NextFunction) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJsonWebToken = function (): string {
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1h"},
    );
};

userSchema.methods.generateResetPasswordToken = function (): string {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    const tenMinute = 10 * 60 * 1000;
    this.resetPasswordExpire = Date.now() + tenMinute;
    return resetToken;
};

userSchema.post("findOneAndDelete", () => {
    console.log("🙂 the user has been deleted.");
});

export default mongoose.model<IUser>("User", userSchema);
