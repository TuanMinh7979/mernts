import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";

import { IDecodedToken, IUser, IReqAuth } from "../config/interface";

const authCtrl = {
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

  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await User.findOne({ account });
      if (!user) return res.status(400).json({ msg: "Account not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        let msgError =
          user.type === "register"
            ? "Password is incorrect."
            : `Password is incorrect. This account login with ${user.type}`;

        return res.status(400).json({ msg: msgError });
      }

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      res.json({
        msg: "Login Success!",
        access_token,
        user: { ...user._doc, password: "" },
      });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.code });
    }
  },
  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid authentication" });
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });
      return res.json({ msg: " logged out" });
    } catch (err: any) {
      if (err instanceof Error)
        return res.status(500).json({ msg: "messssssage" + err.message });
      return res.status(500).json({ msg: err.code });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Dont have Refresh token" });
      let decoded;
      try {
        decoded = <IDecodedToken>(
          jwt.verify(rf_token, `${process.env.REFRESH_SECRET}`)
        );
      } catch (err: any) {
        return res.status(500).json({
          msg: `refresh new token error (your refreshToken over ${process.env.RF_TOKEN_EXP}), please login again`,
        });
      }

      const user = await User.findById(decoded.id).select("+rf_token");

      if (!user)
        return res.status(400).json({ msg: "This account does not exist." });

      const access_token = generateAccessToken({ id: user._id });

      res.json({ access_token, user });
    } catch (err: any) {
      return res
        .status(500)
        .json({ msg: "refreshToken Controller " + err.message });
    }
  },
};

export default authCtrl;
