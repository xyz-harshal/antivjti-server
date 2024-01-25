import mongoose from "mongoose"
let replySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  reply: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  writterId: {
    type: String,
    required: true
  },
  writterName: {
    type: String,
    required: true
  },
  upvoteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  date:{
    type:Date,
    default: Date.now
  },
  downvoteIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
})

export default mongoose.model('reply', replySchema)