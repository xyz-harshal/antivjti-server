import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"

import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/eventsRoute.js"
import repliesRoute from "./routes/repliesRoute.js"
import voteRoute from "./routes/voteRoute.js"

let app = express();
dotenv.config();
const corsOption = {
origin: ['https://www.antivjti.tech', 'https://antivjti.tech', 'http://localhost:3000'],
}
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '2mb' }));
app.options('*', cors(corsOption));
app.use(express.json());
app.use(cors(corsOption));
app.use("/", userRoute);
app.use("/", tweetRoute);
app.use("/",repliesRoute)
app.use("/", voteRoute);
app.get('/',(req,res)=>{
  res.json({message:'hello'})
})
try {
  mongoose.connect(process.env.MONGODB_URI)
  console.log(`database connected`)
  app.listen(process.env.PORT, () => {
    console.log(`now your server is running on port ${process.env.PORT}`);
  });
}
catch (e) {
  console.log(e.message)
}
