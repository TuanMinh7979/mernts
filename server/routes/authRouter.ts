import express from "express";
import authCtrl from "../controllers/authCtrl";
import { validRegister } from "../middleware/valid";
import auth from "../middleware/auth";
import { showRequest } from "./router-utils";
const router = express.Router();


router.post("/register", validRegister, showRequest(authCtrl.registerPro));

router.post("/login", showRequest(authCtrl.login));
router.get("/logout", auth, showRequest(authCtrl.logout));
router.get("/refresh_token", showRequest(authCtrl.refreshToken));

export default router;
