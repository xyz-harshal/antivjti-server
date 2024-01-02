import userModel from "../models/userSchema.js";

export async function login(req,res){
try{
    // console.log(req.body);
    let harshal=new userModel({
      email:req.body.email
    })
    await harshal.save();
    res.status(200).json({message:"data successfully parsed"})
  }
  catch(e){
    console.log(e.message);
    res.status(500).json({message:"some error"})
  }

}

