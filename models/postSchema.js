import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
  userID:{
    type:String,
  },
  post:{
    type:String,
  }
});
export default mongoose.model("post",postSchema);
