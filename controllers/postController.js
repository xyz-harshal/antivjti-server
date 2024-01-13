import postModel from "../models/postSchema.js"
import userModel from "../models/userSchema.js";
import replyModel from "../models/replySchema.js";
import jwt from "jsonwebtoken";
import revArray from "../utils/revArray.js";
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

export async function get(req,res ){
  try{
    let data=(await postModel.find({}));
    res.json(revArray(data));
  }
  catch(e){
    res.status(500).json({message:"all bad"});
  }
}
export async function getSpecific(req,res){
  try{
    let data=await postModel.findOne(req.body);
    console.log((data.upvoteIds.length));
    res.json(data);
  }
  catch(e){
    res.status(500).json({message:e.message});
  }
}

export async function replySpecific(req,res){
  try{
    let {userId,postId,reply,writterId} =req.body;
    let wId=jwt.verify(writterId,process.env.SECRET);
    let writterName=await userModel.findOne({_id:wId._id});
    let data=new replyModel({
      userId:userId,
      postId:postId,
      reply:reply,
      writterId:wId,
      writterName:writterName.username
    });
    data.save();
    res.status(200).json("success");
  }
  catch(e){
    res.status(500).json({message:e.mesaage});
  }
}
export async function getReplies(req,res){
  try{
    let _id=req.body._id;
    let response=await replyModel.find({postId:_id});
    res.json(revArray(response));
  }
  catch(e){
    res.status(500).json({message:e.mesaage});
  }
}