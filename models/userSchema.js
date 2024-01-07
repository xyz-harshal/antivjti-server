import mongoose from "mongoose";

let userSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  batch:{
    type:Number,
    required:true
  },
  branch:{
    type:String,
    require:true
  },
});

export default mongoose.model('User',userSchema);
