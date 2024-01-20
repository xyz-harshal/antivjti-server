import userModel from "../models/userSchema.js"
import jwtVerify from "../utils/jwtVerify.js"

export async function authMiddleware(req, res, next) {
    try {
        const authToken = req.headers['authorization'];
        if (authToken) {
            let authId = jwtVerify(authToken)
            let userId = await userModel.findOne({ _id: authId })
            if (userId) next()
            else return res.json({ message: "data invaliid" })
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

}