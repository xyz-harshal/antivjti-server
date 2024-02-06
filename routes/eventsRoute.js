import {Router} from "express"
import {postEvents,getEvents} from "../controllers/eventsController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import {mainMiddleware} from "../middlewares/mainMiddleware.js"
const router=Router()

router.post("/postEvents",mainMiddleware,authMiddleware,postEvents)
router.get("/getEvents",mainMiddleware,authMiddleware,getEvents)
export default router