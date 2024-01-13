import {Router} from "express";
import {upVote, downVote, Check, upVoteReply1, downVoteReply1, CheckReply1} from "../controllers/vote.js";
const router = Router();

router.post("/vote/up", upVote);
router.post("/vote/down", downVote);
router.post("/vote/check",Check);
router.post("/reply1/vote/up", upVoteReply1);
router.post("/reply1/vote/down", downVoteReply1);
router.post("/reply1/vote/check", CheckReply1);
export default router;