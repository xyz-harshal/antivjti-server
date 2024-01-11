import {Router} from "express";
import {post,get,getSpecific,replySpecific,getReplies} from "../controllers/postController.js"

const router=Router()
router.post("/post",post)
router.get("/get",get)
router.post('/getSpecific',getSpecific)
router.post('/reply',replySpecific)
router.post('/getReplies',getReplies)
export default router