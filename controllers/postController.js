import postModel from "../models/postSchema.js"

export async function post(req, res) {
  try {
    let data = new postModel({
      userID: req.body.userId,
      post: req.body.post
    });
    data.save();
    console.log(req.body);
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
