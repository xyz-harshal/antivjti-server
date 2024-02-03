import {Router} from "express"
import {postEvents,getEvents} from "../controllers/eventsController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router=Router()

router.post("/postEvents",authMiddleware,postEvents)
router.get("/getEvents",authMiddleware,getEvents)
export default router