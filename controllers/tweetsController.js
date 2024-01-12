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
      username:username
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
    let data=(await postModel.find({}));
    if(data.length>1){
      data=data.reverse()
    }
    res.json(data)
  }
  catch(e){
    res.status(500).json({message:"all bad"});
  }
}