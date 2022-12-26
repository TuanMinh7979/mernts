import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import { validateEmail } from "../middleware/valid";
import sendEmail from "../config/sendMail";
import { INewUser, IDecodedToken, IUser } from "../config/interface";

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await User.findOne({ account });
      if (user) {
        return res
          .status(400)
          .json({ msg: "Email or phone number already exist" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };
      //active to save

      const active_token = generateActiveToken({
        newUser,
      });

      if (validateEmail(account)) {
        const url = `${process.env.BASE_URL}/active/${active_token}`;
        console.log("send mail ...");
        sendEmail(account, url, "Xac nhan dia chi email");
        return res.json({ msg: "success! Please check your email" });
      }

      return res.json({
        status: "OK",
        msg: "register success",
        data: newUser,
        active_token,
      });
    } catch (err) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      const decode = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_SECRET}`)
      );
      const { newUser } = decode;
      if (!newUser) return res.status(500).json({ msg: "Authen failed" });

      const user = new User(newUser);
      await user.save();
      return res.json("actived");
    } catch (err) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await User.findOne({ account });
      if (!user) return res.status(400).json({ msg: "login failed" });

      loginUser(user, password, res);
     
    } catch (err) {
      console.log(err);
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/refresh_token",
  });

  res.json({
    msg: "login sc",
    access_token,
    user: {...user._doc, password: "" },
  });
};

export default authCtrl;
