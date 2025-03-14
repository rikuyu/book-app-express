import mongoose, {Schema} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
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
        required: true, default: "pw",
    },
    role: {
        type: String,
        enum: ["admin", "user"], default: "user",
    },
});

userSchema.post("save", () => {
    console.log("🙂 A new user has been saved.");
});

userSchema.post("findOneAndDelete", () => {
    console.log("🙂 the user has been deleted.");
});

export default mongoose.model<IUser>("User", userSchema);
