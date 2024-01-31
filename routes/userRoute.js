import {Router} from "express";
import {login,register, otpGenerate} from "../controllers/userController.js";
const router = Router();

router.post("/login", login);
router.post("/register",register);
router.post("/otpGenerate",otpGenerate);

export default router;