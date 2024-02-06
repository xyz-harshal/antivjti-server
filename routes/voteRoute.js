import {Router} from "express";
import {upVote, downVote, Check} from "../controllers/voteController.js";
import {mainMiddleware} from "../middlewares/mainMiddleware.js"
const router = Router();

router.post("/vote/up",mainMiddleware, upVote);
router.post("/vote/down",mainMiddleware, downVote);
router.post("/vote/check",mainMiddleware,Check);
export default router;