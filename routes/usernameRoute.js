import {Router} from 'express'
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {usernameController} from '../controllers/usernameController.js'
let router=Router()

router.get('/getUsername',authMiddleware,usernameController)

export default router