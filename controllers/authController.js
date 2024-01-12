import userModel from "../models/userSchema.js";
import jwtVerify from "../utils/jwtVerify.js";
export async function authController(req, res) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if(!authorizationHeader){
            res.json({status:false})  
        }
        if (authorizationHeader) {
            let userId = jwtVerify(authorizationHeader)
            let user = await userModel.findOne({ _id: userId })
            if (user) {
                res.json({status:true})
            }
            else{
                res.json({status:false})
            }
        }
    }
    catch (e) {
        res.status(401).json({ message: e.message });
    }
}