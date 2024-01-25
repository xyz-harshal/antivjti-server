import postModel from "../models/postSchema.js";
import userModel from "../models/userSchema.js";
import replyModel from "../models/replySchema.js";
import jwtVerify from "../utils/jwtVerify.js";

export async function getSpecificTweet(req, res) {
  try {
    let data = await postModel.findOne({ _id: req.body._id });
    const userID = jwtVerify(req.body.userID);
    let voteData = 2;
    if (data.downvoteIds && data.downvoteIds.includes(userID)) {
      voteData = -1;
    } else if (data.upvoteIds && data.upvoteIds.includes(userID)) {
      voteData =  1;
    } else {
      voteData = 0;
    }

    res.json({ data, voteData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
export async function replySpecific(req, res) {
  try {
    let { userId, postId, reply, writterId, img } = req.body;
    let wId = jwtVerify(writterId);
    let writterName = await userModel.findOne({ _id: wId });
    let data = new replyModel({
      userId: userId,
      postId: postId,
      reply: reply,
      img: img,
      writterId: wId,
      writterName: writterName.username,
    });
    data.save();
    let response = await postModel.findOne({ _id: postId });
    response.replies.push(data._id);
    await response.save();
    res.status(200).json("success");
  } catch (e) {
    res.status(500).json({ message: e.mesaage });
  }
}
export async function getReplies(req, res) {
  try {
    let _id = req.body._id;
    let response = await replyModel.find({ postId: _id });
    if (response.length > 1) {
      response = response.reverse();
    }
    const userID = jwtVerify(req.body.userID);
    let voteData = response.map((e)=>{
      if (e.downvoteIds && e.downvoteIds.includes(userID)) {
        return -1;
      } else if (e.upvoteIds && e.upvoteIds.includes(userID)) {
        return 1;
      } else {
        return 0;
      }
      
    });
    res.json({response, voteData});
  } catch (e) {
    res.status(500).json({ message: e.mesaage });
  }
}
