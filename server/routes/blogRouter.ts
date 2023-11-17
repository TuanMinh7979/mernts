import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/blog", auth, blogCtrl.createBlog);
router.get("/home/blogs", blogCtrl.getHomeBlogs);
router.get("/blogs/category/:category_id", blogCtrl.getHomeBlogsByCategoryId);
router.get("/blogs/user/:user_id", blogCtrl.getBlogsByUser);

router
  .route("/blog/:id")
  .get(blogCtrl.getBlog)
  .put(auth, blogCtrl.updateBlog)
  .delete(auth, blogCtrl.deleteBlog);

router.get("/search/blogs", blogCtrl.searchBlogs);

export default router;