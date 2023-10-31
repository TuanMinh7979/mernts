import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_SECRET}`, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });
};

export const generateRefreshToken = (payload: object, res: Response) => {
  const refresh_token = jwt.sign(payload, `${process.env.REFRESH_SECRET}`, {
    expiresIn: process.env.RF_TOKEN_EXP,
  });

  // local
  // res.cookie("refreshtoken", refresh_token);
  // production
  res.cookie("refreshtoken", refresh_token, {

    sameSite: "none",
    secure: true,

  });
  return refresh_token;
};
