import userModel from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const saltRounds=10
import getRandomFruitsName from "random-fruits-name";
let createToken=(_id)=>{
  return jwt.sign({_id},process.env.SECRET)
}

export async function login(req, res) {
  let { email, password } = req.body;
  try {
    let data = await userModel.findOne({ email: email })
    if (!data) {
      res.json({error:{email:false,password:false}})
    }
    if (data) {
      let pass=bcrypt.compareSync(password,data.password)
      if (pass) {
        let token=createToken(data._id);
        res.status(200).json({email,token,error:{email:true,password:true}})
      }
      else {
        res.json({error:{email:true,password:false}});
      }
    }
  }
  catch (e) {
    console.log(e.message)
    res.json({ status: e.message })
  }
}

export async function register(req, res) {
  let { email, password } = req.body
  try {
    let data = await userModel.findOne({ email:email })
    if (data) {
      res.json({error:true})
    }
    if (!data) {
      const batch = email.match(/(\d+)/)
      const branch = email.match(/@(\w+)/)
      const username=getRandomFruitsName()
      // hashing and storing in DB
      const hash=bcrypt.hashSync(password,saltRounds);
      let user = new userModel({
        email:email,
        password:hash,
        username:username,
        batch:batch[0],
        branch:branch[1]
      })
      await user.save();
      let token=createToken(user._id)
      res.status(200).json({email,token,error:false});
    }
  }
  catch (e) {
    res.status(500).json({ message: e.message })
  }
}