import postModel from "../models/postSchema.js"
export async function postEvents(req, res) {
  try {
    let data = new postModel({
      userID: req.user._id,
      post: req.body.post,
      username: req.user.username,
      img: req.body.img
    });
    data.save()
    res.status(200).json({ status: "success" })
  }
  catch (e) {
    res.status(500).json(e.mesaage)
  }
}

export async function getEvents(req, res) {
  try {
    let userID = req.user._id
    let data = await postModel.find({})
    if (data.length > 1) {
      data = data.reverse()
    }
    let voteData = data.map((e) => {
      if (e.downvoteIds && e.downvoteIds.includes(userID)) {
        return -1
      } else if (e.upvoteIds && e.upvoteIds.includes(userID)) {
        return 1
      } else {
        return 0
      }
    })
    res.status(200).json({ data, voteData })
  }
  catch (e) {
    res.status(500).json({ message: e.message })
  }
}