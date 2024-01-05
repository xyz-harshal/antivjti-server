import userModel from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const saltRounds=10

let createToken=(_id)=>{
  return jwt.sign({_id},process.env.SECRET)
}


export async function login(req, res) {
  let { email, password } = req.body;
  try {
    let data = await userModel.findOne({ email: email })
    if (!data) {
      res.json("NOemail")
    }
    if (data) {
      let pass=bcrypt.compareSync(password,data.password)
      if (pass) {
        res.json("loggedIN")
      }
      else {
        res.json("NOpassword");
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
      // throw Error("Username already in use")
      res.json({status:"already in use"})
    }
    if (!data) {
      //hashing and storing in DB
      const hash=bcrypt.hashSync(password,saltRounds);
      let user = new userModel({
        email:email,
        password:hash
      })
      await user.save();
      let token=createToken(user._id)
      res.status(200).json({email,token});
    }
  }
  catch (e) {
    res.status(500).json({ message: e.message })
  }
}