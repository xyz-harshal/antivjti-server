import postModel from "../models/postSchema.js"
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
export async function post(req, res) {
  try {
    let userId=jwt.verify(req.body.userId,process.env.SECRET)
    let username=await userModel.findOne({_id:userId._id});
    let data = new postModel({
      userID: userId._id,
      post: req.body.post,
      username:username.username
    });
    data.save();
    res.status(200).json("success");
  }
  catch (e) {
    res.status(500).json("error detected")
  }
}

export async function get(req,res){
  try{
    let data=(await postModel.find({}));
    res.json(data);
  }
  catch(e){
    res.status(500).json({message:"all bad"});
  }
}
