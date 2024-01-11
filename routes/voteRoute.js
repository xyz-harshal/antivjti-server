import {Router} from "express";
import {upVote, downVote} from "../controllers/vote.js";
const router = Router();

router.post("/vote/up", upVote);
router.post("/vote/down", downVote);
export default router;