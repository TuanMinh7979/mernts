import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import auth from "../middleware/auth";
import { showRequest } from "./router-utils";
const router = express.Router();

router.post("/blog", auth, showRequest(blogCtrl.createBlog));
router.get("/home/blogs", showRequest(blogCtrl.getHomeBlogs));
router.get(
  "/blogs/category/:category_id",
  showRequest(blogCtrl.getHomeBlogsByCategoryId)
);
router.get("/blogs/user/:user_id", showRequest(blogCtrl.getBlogsByUser));

router
  .route("/blog/:id")
  .get(showRequest(blogCtrl.getBlog))
  .put(auth, showRequest(blogCtrl.updateBlog))
  .delete(auth, showRequest(blogCtrl.deleteBlog));

router.get("/search/blogs", showRequest(blogCtrl.searchBlogs));

export default router;
