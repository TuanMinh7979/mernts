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

  res.cookie("refreshtoken", refresh_token);
  return refresh_token;
};
