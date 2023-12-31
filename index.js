import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
let app=express();
const corsOption={
  origin :'http://localhost:3000',
}

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors(corsOption));

app.use("/login",userRoute);
try{
mongoose.connect(process.env.MONGODB_URI)
  console.log(`database connected`)
 app.listen(process.env.PORT,()=>{
  console.log(`now your server is running on port ${process.env.PORT}`);
});
}
catch(e){
  console.log(e.message)
}
