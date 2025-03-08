import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
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
        required: true, default: "pw",
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"], default: "USER",
    },
});

export default mongoose.model("User", userSchema);
