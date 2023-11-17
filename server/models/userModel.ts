import mongoose from "mongoose";
import { IUser } from "../config/interface";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add your name"],
      trim: true,
      maxLength: [20, "your name is up to 20 chars"],
      minLength: [6, "your name is atleast 6 chars"],
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
      default: "https://res.cloudinary.com/djnekmzdf/image/upload/v1700223914/sglvprbhnu5ncoy9p6vb.png",
    },
    type: {
      type: String,
      default: "normal",
    },
    role: {
      type: String,
      default: "user",
    },

    rf_token: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IUser>("user", userSchema);
