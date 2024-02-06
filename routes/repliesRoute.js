import {Router} from "express"
import {getSpecificEvent,replySpecific,getReplies} from "../controllers/repliesController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import {mainMiddleware} from "../middlewares/mainMiddleware.js"
let router=Router()

router.post('/getSpecificEvent',mainMiddleware,authMiddleware,getSpecificEvent)
router.post('/reply',mainMiddleware,authMiddleware,replySpecific)
router.post('/getReplies',mainMiddleware,authMiddleware,getReplies)

export default router