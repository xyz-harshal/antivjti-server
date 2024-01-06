import { Router } from "express";
import { homeAuthController } from "../controllers/homeAuthController.js";
let router=Router();

router.get("/homeAuth",homeAuthController);

export default router;