import mongoose from "mongoose"
let replySchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    reply:{
        type:String,
        required:true
    },
    writterId:{
        type:String,
        required:true
    },
    writterName:{
        type:String,
        required:true
    }
})

export default mongoose.model('reply',replySchema)