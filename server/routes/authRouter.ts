import express from "express";
import authCtrl from "../controllers/authCtrl";
import { validRegister } from "../middleware/valid";
import auth from "../middleware/auth";

const router = express.Router();
router.post("/test", (req, res) => {
  res.json({ msg: "ok" });
});


router.post("/register", validRegister, authCtrl.registerPro);
router.post("/login", authCtrl.login);
router.get("/logout", auth, authCtrl.logout);
router.get("/refresh_token", authCtrl.refreshToken);

export default router;
