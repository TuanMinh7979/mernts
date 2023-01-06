import { Request, Response, NextFunction } from "express";

import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { IDecodedToken, IReqAuth } from "../config/interface";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid authenticate" });
    const decoded = <IDecodedToken>(
      jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    );

    const user = await userModel.findById({ id: decoded.id });
    // req.user = { a: "a" };
    next();
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};
export default auth;