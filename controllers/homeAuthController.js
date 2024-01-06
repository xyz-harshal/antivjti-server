import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";
export async function homeAuthController(req, res) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if(!authorizationHeader){
            res.json({status:false})
        }
        if (authorizationHeader) {
            let response = jwt.verify(authorizationHeader, process.env.SECRET)
            let userId = await userModel.findOne({ _id: response._id })
            if (userId) {
                res.json({active:true})
            }
            else{
                res.json({active:false})
            }
        }
    }
    catch (e) {
        res.status(401).json({ message: e.message });
    }

}