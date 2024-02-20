import userModel from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const saltRounds = 10
import getRandomFruitsName from "random-fruits-name"
import nodemailer from 'nodemailer'
// const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
let createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET)
}

export async function login(req, res) {
  let { email, password } = req.body
  try {
    let data_array = await userModel.find({});
    if (!data_array) {
      return res.status(500).json({ error: "Some error occurred" });
    }
    let validUser = false;
    for (let i = 0; i < data_array.length; i++) {
      if (bcrypt.compareSync(email, data_array[i].email)) {
        let pass = bcrypt.compareSync(password, data_array[i].password);
        if (pass) {
          validUser = true;
          let token = createToken(data_array[i]._id);
          res.status(200).json({ token, error: { email: true, password: true } })
          break
        } else {
          res.json({ error: { email: true, password: false } });
          return
        }
      }
    }
    if (!validUser) {
      res.json({ error: { email: false, password: false } });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: e.message });
  }
}

export async function verify(req, res) {
  let { email } = req.body
  try {
    let data_array = await userModel.find({})
    let validUser = false
    if (!data_array) {
      return res.status(500).json({ error: "Some error occurred" });
    }
    for (let i = 0; i < data_array.length; i++) {
      if (bcrypt.compareSync(email, data_array[i].email)) {
        validUser = true;
        res.json({ error: true })
        break;
      }
      else {
        validUser = false;
      }
    }
    if (!validUser) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL, pass: process.env.PASS }
      })
      let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `OTP for Email Verification is: ${otp}`,
        html: `<h1>Your OTP is: ${otp}</h1>`
      }
      let combinedValue=`${email}:${otp}`
      let combinedHash = jwt.sign({combinedValue}, process.env.SECRET)
      transport.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(400).json({error})
        } else {
          res.status(200).json({ combinedHash,error: false })
        }
      })
    }
  }
  catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export async function register(req, res) {
  let { email, password,hashed,userOtp } = req.body
  let decodedValue = jwt.verify(hashed, process.env.SECRET).combinedValue;
  let [decodedEmail, decodedOTP] = decodedValue.split(':');
  try {
    if (decodedOTP == userOtp && decodedEmail == email) {
      let username = uniqueNamesGenerator({ dictionaries: [adjectives, animals] });
      let mail = bcrypt.hashSync(email, saltRounds)
      let pass = bcrypt.hashSync(password, saltRounds)
      let user = new userModel({
        email: mail,
        password: pass,
        username: username
      })
      await user.save()
      let token = createToken(user._id)
      res.status(200).json({ token, error: false })
    }
    else {
      res.json({ error: true})
    }
  }
  catch (e) {
    console.log(e.message)
  }
}