import { Router } from "express";
import { authController } from "../controllers/authController.js";
let router=Router();

router.get("/mainAuth",authController);

export default router;