import {Router} from "express";
import {login,verify, register} from "../controllers/userController.js";
import {mainMiddleware} from "../middlewares/mainMiddleware.js";
const router = Router();

router.post("/login",mainMiddleware, login);
router.post("/verify",mainMiddleware,verify);
router.post("/register",mainMiddleware,register);

export default router