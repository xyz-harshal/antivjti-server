import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios"; 
let port = 4000;
let app=express();
const corsOption={
  origin :'http://localhost:3000',
}

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors(corsOption));

let userSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  }
})
let Users=mongoose.model('User',userSchema);
app.post("/login",async(req,res)=>{
  try{
    console.log(req.body);
    let harshal=new Users({
      email:req.body.email
    })
    await harshal.save();
    res.status(200).json({message:"data successfully parsed"})
  }
  catch(e){
    console.log(e.message);
    res.status(500).json({message:"some error"})
  }

});

try{
mongoose.connect(`mongodb+srv://harshal:gimmelactose@atlascluster.jg5rrcj.mongodb.net/?retryWrites=true&w=majority`)
  console.log("database connected")
 app.listen(port,()=>{
  console.log(`now your server is running on port ${port}`);
});
}
catch(e){
  console.log(e.message)
}
