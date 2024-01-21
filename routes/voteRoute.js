import {Router} from "express";
import {upVote, downVote, Check} from "../controllers/voteController.js";
const router = Router();

router.post("/vote/up", upVote);
router.post("/vote/down", downVote);
router.post("/vote/check",Check);
export default router;