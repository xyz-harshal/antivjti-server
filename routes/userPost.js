import {Router} from "express";
import {post,get} from "../controllers/postController.js"

const router=Router();
router.post("/post",post);
router.get("/get",get);
export default router;