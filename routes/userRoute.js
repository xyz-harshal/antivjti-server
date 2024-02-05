import {Router} from "express";
import {login,verify, register} from "../controllers/userController.js";
const router = Router();

router.post("/login", login);
router.post("/verify",verify);
router.post("/register",register);

export default router