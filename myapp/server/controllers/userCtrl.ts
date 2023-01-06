import { Request, Response } from "express";
const userCtrl = {
  updateUser: async (req: Request, res: Response) => {
    try {
      res.json({ msg: "uptc" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
