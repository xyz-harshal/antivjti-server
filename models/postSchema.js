import mongoose, { trusted } from "mongoose";

const postSchema=new mongoose.Schema({
  userID:{
    type:String,
    required:true
  },
  post:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  }
});
export default mongoose.model("post",postSchema);
