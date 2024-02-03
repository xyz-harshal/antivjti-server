import userModel from "../models/userSchema.js"
import jwtVerify from "../utils/jwtVerify.js"

export async function authMiddleware(req, res, next) {
    try {
        const authToken = req.headers['authorization'];
        if (!authToken) {
            console.log('no token provided')
            res.status(401).json({ message: 'unautharized user' })
        }
        let authId = jwtVerify(authToken)
        let user = await userModel.findOne({ _id: authId })
        if (user) {
            req.user = user
            next()
        }
        else
            return res.status(418).json({ message: 'lmao noob' })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}