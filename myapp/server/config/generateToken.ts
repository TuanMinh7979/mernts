import jwt from "jsonwebtoken";
import { Response } from "express";
export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACTIVE_SECRET}`, {
    expiresIn: "100m",
  });
};

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_SECRET}`, {
    expiresIn: "15s",
  });
};

export const generateRefreshToken = (payload: object, res: Response) => {
  const refresh_token = jwt.sign(payload, `${process.env.REFRESH_SECRET}`, {
    expiresIn: "30d",
  });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });
  return refresh_token;
};
