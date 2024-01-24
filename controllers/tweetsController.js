import postModel from "../models/postSchema.js"
import userModel from "../models/userSchema.js";

import jwtVerify from "../utils/jwtVerify.js"

export async function postTweets(req, res) {
  try {
    let userId=jwtVerify(req.body.userId)
    let username=(await userModel.findOne({_id:userId})).username;
    let data = new postModel({
      userID: userId,
      post: req.body.post,
      username:username,
      img:req.body.img
    });
    data.save();
    res.status(200).json({status:"success"});
  }
  catch (e) {
    res.status(500).json(e.mesaage)
  }
}

export async function getTweets(req,res){
  try{
    const authToken = req.headers['authorization'];
    const userID = jwtVerify(authToken);
    let data=(await postModel.find({}));
    if(data.length>1){
      data=data.reverse()
    }
    let voteData = data.map((e)=>{
      if (e.downvoteIds && e.downvoteIds.includes(userID)) {
        return -1;
      } else if (e.upvoteIds && e.upvoteIds.includes(userID)) {
        return 1;
      } else {
        return 0;
      }
      
    });
    res.json({data, voteData});
  }
  catch(e){
    res.status(500).json({message:"all bad"});
  }
}