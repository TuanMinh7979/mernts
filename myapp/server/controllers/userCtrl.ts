import { Request, Response } from "express";
import User from "../models/userModel";
import { IReqAuth } from "../config/interface";
const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(500).json({ msg: "Authen failed" });
    try {
      const { avatar, name } = req.body;
      const savedUser = await User.findByIdAndUpdate(
        req.user._id,

        {
          $set: { avatar, name },
        },
        { new: true }
      );

      res.json({ msg: "uptc", savedUser });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
