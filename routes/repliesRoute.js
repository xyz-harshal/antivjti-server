import {Router} from "express"
import {getSpecificTweet,replySpecific,getReplies} from "../controllers/repliesController.js"
let router=Router()

router.post('/getSpecificTweet',getSpecificTweet)
router.post('/reply',replySpecific)
router.post('/getReplies',getReplies)

export default router