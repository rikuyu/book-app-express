import mongoose, {Schema} from "mongoose";
import bcrypt, {genSalt} from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";

    getJsonWebToken(): string;

    matchPassword(password: string): Promise<boolean>;
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
            message: (props: { value: any; }) => `${props.value} is not a valid email.`,
        },
    },
    password: {
        type: String,
        minlength: 3,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"], default: "user",
    },
});

userSchema.pre("save", async function () {
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

userSchema.post("findOneAndDelete", () => {
    console.log("🙂 the user has been deleted.");
});

export default mongoose.model<IUser>("User", userSchema);
