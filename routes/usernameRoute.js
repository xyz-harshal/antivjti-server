import {Router} from 'express'
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {usernameController} from '../controllers/usernameController.js'
import {mainMiddleware} from '../middlewares/mainMiddleware.js'
let router=Router()

router.get('/getUsername',mainMiddleware,authMiddleware,usernameController)

export default router