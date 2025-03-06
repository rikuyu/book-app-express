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
