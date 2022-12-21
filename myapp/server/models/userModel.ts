import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
