import express from "express";
import commentCtrl from "../controllers/commentCtrl";
import auth from "../middleware/auth";
import { showRequest } from "./router-utils";
const router = express.Router();

router.post("/comment", auth, showRequest(commentCtrl.createComment));
router.post("/reply_comment", auth, showRequest(commentCtrl.replyComment));
router.get("/comments/blog/:id", showRequest(commentCtrl.getComments));
router.patch("/comments/:id", auth, showRequest(commentCtrl.updateComment));
router.delete("/comments/:id", auth, showRequest(commentCtrl.deleteComment));

export default router;
