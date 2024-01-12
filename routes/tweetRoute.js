import {Router} from "express";
import {postTweets,getTweets} from "../controllers/tweetsController.js"

const router=Router()

router.post("/postTweets",postTweets)
router.get("/getTweets",getTweets)

export default router