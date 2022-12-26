"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "please add your name"],
        trim: true,
        maxLength: [20, "your name is up to 20 chars"],
    },
    account: {
        type: String,
        required: [true, "Please add your account"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        trim: true,
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/free-icon/user_318-790139.jpg?w=2000",
    },
    type: {
        type: String,
        default: "normal",
    },
    role: {
        type: String,
        default: "user",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", userSchema);
