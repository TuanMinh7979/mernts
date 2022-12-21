import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import { generateActiveToken } from "../config/generatetoken";

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      if (user) {
        return res
          .status(400)
          .json({ msg: "Email or phone number already exist" });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new Users({
        name,
        account,
        password: passwordHash,
      });
      await newUser.save();

      const active_token = generateActiveToken({
        name,
        account,
        password: passwordHash,
      });

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
};

export default authCtrl;
