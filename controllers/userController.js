import userModel from "../models/userSchema.js";

export async function login(req, res) {
  let { email, password } = req.body;
  try {
    let data = await userModel.findOne({ email: email });
    if (!data) {
      res.json({ status: "username not found" });
    }
    if (data) {
      if (data.password == password) {
        res.json({ status: "logged in" });
      }
      else {
        res.json({ status: "wrong password" })
      }
    }
  }
  catch (e) {
    console.log(e.message);
    res.json({ status: e.message })
  }
}

export async function register(req, res) {
  let { email, password } = req.body;
  try {
    let data = await userModel.findOne({ email:email });
    if (data) {
      res.json({ status: "account already exit" })
    }
    if (!data) {
      let user = new userModel({
        email:email,
        password:password
      })
      await user.save();
      res.json({status:"registered nicely"})
    }
  }
  catch (e) {
    res.status(500).json({ message: e.message });
  }
}