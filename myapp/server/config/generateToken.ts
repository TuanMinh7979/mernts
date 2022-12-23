import jwt from "jsonwebtoken";

export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACTIVE_SECRET}`, {
    expiresIn: "10m",
  });
};

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_SECRET}`, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.REFRESH_SECRET}`, {
    expiresIn: "30d",
  });
};
