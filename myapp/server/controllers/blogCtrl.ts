import { Request, Response } from "express";
import Blogs from "../models/blogModel";
import { IReqAuth } from "../config/interface";

const blogCtrl = {
  createBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const { title, content, description, thumbnail, category } = req.body;

      const newBlog = new Blogs({
        user: req.user._id,
        title,
        content,
        description,
        thumbnail,
        category,
      });

      await newBlog.save();
      res.json({ newBlog });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getHomeBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.aggregate([
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 } },
            ],
            as: "user",
          },
        },
      ]);
      res.json(blogs);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getHomeBlogsMy: async (req: Request, res: Response) => {
    try {
      //   const blogs = await Blogs.aggregate([
      //     {
      //       $lookup: {
      //         from: "users",
      //         localField: "user",
      //         foreignField: "_id",
      //         as: "user",
      //       },
      //     },
      //   ]);

      const blogs = await Blogs.find().populate("user");
      res.json(blogs);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getHomeBlogs0: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.find();
      res.json(blogs);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default blogCtrl;
