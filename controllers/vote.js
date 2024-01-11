import jwt from "jsonwebtoken";
import postModel from "../models/postSchema.js";
import userModel from "../models/userSchema.js";

export async function upVote(req, res) {
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
  var post = await postModel.findOne({ _id: postID });
  var user = await userModel.findOne({ _id: userID });
  if (!post.upvoteIds.includes(user._id)) {
    await post.upvoteIds.push(user._id);
    if (post.downvoteIds.includes(user._id)) {
      await post.downvoteIds.pop(user._id);
    }
    post.save();
  } else {
    await post.upvoteIds.pop(user._id);
    post.save();
    console.log("false");
}
}

export async function downVote(req, res) {
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
  var post = await postModel.findOne({ _id: postID });
  var user = await userModel.findOne({ _id: userID });
  if (!post.downvoteIds.includes(user._id)
  ) {
    await post.downvoteIds.push(user._id);
    if (post.upvoteIds.includes(user._id)) {
      await post.upvoteIds.pop(user._id);
    }
    post.save();
    console.log(post);
  } else {
    await post.downvoteIds.pop(user._id);
    post.save();
    console.log("false");
  }
}
