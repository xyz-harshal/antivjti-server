import userModel from "../models/userSchema.js"
import jwtVerify from "../utils/jwtVerify.js"

export async function authMiddleware(req, res, next) {
    try {
        const authToken = req.headers['authorization']
        if (!authToken) {
            res.status(401).json({ message: 'unautharized user' })
        }
        let authId = jwtVerify(authToken)
        let user = await userModel.findOne({ _id: authId })
        if (!user) return res.status(418).json({ message: 'lmao noob' })
        req.user = user
        next()
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}