import jwt from "jsonwebtoken";
import postModel from "../models/postSchema.js";
import userModel from "../models/userSchema.js";
import replyModel from "../models/replySchema.js";

export async function upVote(req, res) {
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
  try {
    var post = await postModel.findOne({ _id: postID });
    var user = await userModel.findOne({ _id: userID });
  } catch (e) {
    console.log(e.message);
    await res.status(500).json("error detected");
  }
  if (!post.upvoteIds.includes(user._id)) {
    try {
      post.upvoteIds.push(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    if (post.downvoteIds.includes(user._id)) {
      try {
        post.downvoteIds.pop(user._id);
      } catch (e) {
        console.log(e.message);
        await res.status(500).json("error detected");
      }
    };
    await post.save();
    await res.json(post);
  } else {
    try {
      post.upvoteIds.pop(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    await post.save();
    await res.json(post);
  }
}

export async function downVote(req, res) {
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
  try {
    var post = await postModel.findOne({ _id: postID });
    var user = await userModel.findOne({ _id: userID });
  } catch (e) {
    console.log(e.message);
    await res.status(500).json("error detected");
  }
  if (!post.downvoteIds.includes(user._id)) {
    try {
      post.downvoteIds.push(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    if (post.upvoteIds.includes(user._id)) {
      try {
        post.upvoteIds.pop(user._id);
      } catch (e) {
        console.log(e.message);
        await res.status(500).json("error detected");
      }
    };
    await post.save();
    await res.json(post);
  } else {
    try {
      post.downvoteIds.pop(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    await post.save();
    await res.json(post);
  }
}

// export async function Check(req, res){
//   const uidresponse = req.body.userID;
//   const postID = req.body.postID;
//   let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
//   try {
//     var post = await postModel.findOne({ _id: postID });
//     var user = await userModel.findOne({ _id: userID });
//   } catch (e) {
//     console.log(e.message);
//     await res.status(500).json("error detected");
//   }
//   if (post.downvoteIds.includes(user._id)){
//     res.json({value:-1})
//   }
//   else if (post.upvoteIds.includes(user._id)){
//     res.json({value: 1})
//   }
//   else{
//     res.json({value: 0})
//   }
// }
export async function Check(req, res) {
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID;
  try {
    userID = jwt.verify(uidresponse, process.env.SECRET)._id;
    console.log(postID)
    var post = await postModel.findOne({ _id: postID });
    var user = await userModel.findOne({ _id: userID });

    if (!post || !user) {
      return res.json({ error: "Post or user not found" });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: "Internal server error" });
  }

  if (post.downvoteIds && post.downvoteIds.includes(user._id)) {
    res.json({ value: -1 });
  } else if (post.upvoteIds && post.upvoteIds.includes(user._id)) {
    res.json({ value: 1 });
  } else {
    res.json({ value: 0 });
  }
}


export async function upVoteReply1(req, res) {
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
  try {
    var post = await replyModel.findOne({ _id: postID });
    var user = await userModel.findOne({ _id: userID });
  } catch (e) {
    console.log(e.message);
    await res.status(500).json("error detected");
  }
  if (!post.upvoteIds.includes(user._id)) {
    try {
      post.upvoteIds.push(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    if (post.downvoteIds.includes(user._id)) {
      try {
        post.downvoteIds.pop(user._id);
      } catch (e) {
        console.log(e.message);
        await res.status(500).json("error detected");
      }
    };
    await post.save();
    await res.json(post);
  } else {
    try {
      post.upvoteIds.pop(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    await post.save();
    await res.json(post);
  }
}

export async function downVoteReply1(req, res) {
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
  try {
    var post = await replyModel.findOne({ _id: postID });
    var user = await userModel.findOne({ _id: userID });
  } catch (e) {
    console.log(e.message);
    await res.status(500).json("error detected");
  }
  if (!post.downvoteIds.includes(user._id)) {
    try {
      post.downvoteIds.push(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    if (post.upvoteIds.includes(user._id)) {
      try {
        post.upvoteIds.pop(user._id);
      } catch (e) {
        console.log(e.message);
        await res.status(500).json("error detected");
      }
    };
    await post.save();
    await res.json(post);
  } else {
    try {
      post.downvoteIds.pop(user._id);
    } catch (e) {
      console.log(e.message);
      await res.status(500).json("error detected");
    }
    await post.save();
    await res.json(post);
  }
}

export async function CheckReply1(req, res){
  const uidresponse = req.body.userID;
  const postID = req.body.postID;
  let userID = jwt.verify(uidresponse, process.env.SECRET)._id;
  try {
    var post = await replyModel.findOne({ _id: postID });
    var user = await userModel.findOne({ _id: userID });
  } catch (e) {
    console.log(e.message);
    await res.status(500).json("error detected");
  }
  if (post.downvoteIds.includes(user._id)){
    res.json({value:-1})
  }
  else if (post.upvoteIds.includes(user._id)){
    res.json({value: 1})
  }
  else{
    res.json({value: 0})
  }
}