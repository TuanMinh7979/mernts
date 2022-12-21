import { Request, Response, NextFunction } from "express";
export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "please add your name" });
  } else if (name.length > 20) {
    return res.status(400).json({ msg: "please check your name length" });
  }
  if (!account) {
    return res
      .status(400)
      .json({ msg: "please add your email or phone number" });
  } else if (!validatePhone(account) && !validateEmail(account)) {
    return res.status(400).json({ msg: "please check your account format" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "password must be at least 6 chars" });
  }

  return next();
};

const validatePhone = (phone: string) => {
  const re = /^[+]/g;
  return re.test(phone);
};
const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
