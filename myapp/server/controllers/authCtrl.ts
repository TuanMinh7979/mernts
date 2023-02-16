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
const CLIENT_URL = `${process.env.BASE_URL}`;
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


      const active_token = generateActiveToken(newUser);

      const url = `${CLIENT_URL}/active/${active_token}`;

      console.log(">>>>>>>>>>>>>>>>>>>", validateEmail(account));
      if (validateEmail(account)) {
        console.log("sendddddddddddddddddddddMAIL");
        sendEmail(account, url, "Verify your email address");
        return res.json({ msg: "Success! Please check your email." });
      }
      console.log("CONSOLE REGISTER ACTIVETOKEN", active_token);
      console.log(">>>>>>>>>>>>>>>>>>>");
      return res.json({
        status: "OK",
        msg: "register success 123232",
        data: newUser,
        active_token,
      });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },
  registerPro: async (req: Request, res: Response) => {
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

      const userToSave = new User(newUser);
      await userToSave.save();

      return res.json({
        status: "OK",
        msg: "register production success",
        data: newUser,
      });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      console.log("CONSOLE ACTIVEACCOUNT ", active_token);
      const decode = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_SECRET}`)
      );
      const { newUser } = decode;
      if (!newUser) return res.status(500).json({ msg: "Authen failed" });

      const user = new User(newUser);
      await user.save();
      return res.json("actived");
    } catch (err: any) {
      console.error(err);
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });

      let errMsg = "something wrong";
      if (err.code === 11000) {
        errMsg = Object.keys(err.keyValue)[0] + " already exists.";
      } else {
        let name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      }
      return res.status(500).json({ msg: errMsg });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await User.findOne({ account });
      if (!user) return res.status(400).json({ msg: "login failed" });

      loginUser(user, password, res);
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    //neu da dang nhap thi moi lan truy cap ung dung(dispath reload page lam moi) se co 1 token khac nhau duoc lam moi
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please login before" });

      console.log("------------cookie check", req.cookies);
      let a = jwt.verify(rf_token, `${process.env.REFRESH_SECRET}`);

      const decoded = <IDecodedToken>a;
      const user = await User.findById(decoded.id).select("-password");
      if (!user)
        return res.status(400).json({ msg: "This account does not exist" });
      const access_token = generateAccessToken({ id: user._id });
      res.json({ access_token, user });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken");
      console.log(res.cookie);
      //react app will remove :
      // localStorage.removeItem("logged");
      return res.json({ msg: " logged out" });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
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
  });

  res.json({
    msg: "login success server msg",
    access_token,
    user: { ...user._doc, password: "" },
  });
};
export default authCtrl;
