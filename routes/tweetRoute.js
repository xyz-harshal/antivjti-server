import {Router} from "express";
import {postTweets,getTweets} from "../controllers/tweetsController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router=Router()

router.post("/postEvents",authMiddleware,postTweets)
router.get("/getTweets",authMiddleware,getTweets)

export default router