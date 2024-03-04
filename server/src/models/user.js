import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

export const UserModel = mongoose.model("users", userSchema);