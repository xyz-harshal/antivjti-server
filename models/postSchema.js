import mongoose, { trusted } from "mongoose";

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
