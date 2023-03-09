import express from "express";
import commentCtrl from "../controllers/commentCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/comment", auth, commentCtrl.createComment);
router.post("/reply_comment", auth, commentCtrl.replyComment);
router.get("/comments/blog/:id", commentCtrl.getComments);
router.patch("/comments/:id", auth, commentCtrl.updateComment);

export default router;
