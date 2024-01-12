import postModel from "../models/postSchema.js"
import userModel from "../models/userSchema.js";
import replyModel from "../models/replySchema.js";
import jwtVerify from "../utils/jwtVerify.js"

export async function getSpecificTweet(req, res) {
    try {
        let data = await postModel.findOne(req.body)
        res.json(data)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}
export async function replySpecific(req, res) {
    try {
        let { userId, postId, reply, writterId } = req.body
        let wId = jwtVerify(writterId)
        let writterName = await userModel.findOne({ _id: wId });
        let data = new replyModel({
            userId: userId,
            postId: postId,
            reply: reply,
            writterId: wId,
            writterName: writterName.username
        })
        data.save();
        res.status(200).json("success");
    }
    catch (e) {
        res.status(500).json({ message: e.mesaage });
    }
}
export async function getReplies(req, res) {
    try {
        let _id = req.body._id
        let response = await replyModel.find({ postId: _id })
        if (response.length > 1) {
            response = response.reverse()
        }
        res.json(response)
    }
    catch (e) {
        res.status(500).json({ message: e.mesaage })
    }
}