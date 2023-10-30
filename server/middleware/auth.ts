import { Request, Response, NextFunction } from "express";

import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { IDecodedToken, IReqAuth } from "../config/interface";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.header("Authorization");
    if (!accessToken) return res.status(400).json({ msg: "Authen failed" });

    let decoded;
    try {
      decoded = <IDecodedToken>(
        jwt.verify(accessToken, `${process.env.ACCESS_SECRET}`)
      );
    } catch (err: any) {
  
      return res.status(500).json({ msg: "Your refresh token has expired" });
    }
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    req.user = user;

    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};
export default auth;
