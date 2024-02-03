import {Router} from "express"
import {getSpecificEvent,replySpecific,getReplies} from "../controllers/repliesController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
let router=Router()

router.post('/getSpecificEvent',authMiddleware,getSpecificEvent)
router.post('/reply',authMiddleware,replySpecific)
router.post('/getReplies',authMiddleware,getReplies)

export default router