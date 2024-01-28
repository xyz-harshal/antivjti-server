import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  img: {
    type: String,
  },
  date:{
    type:Date,
    default: Date.now
  },
  upvoteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  downvoteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});
export default mongoose.model("post", postSchema);
