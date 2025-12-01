const mongoose=require('mongoose');
const historySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"User", required:true,
    },
    fileName:String,
    fileUrl: String,
    result: String,
    uploadedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("History",historySchema);