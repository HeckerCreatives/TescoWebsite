const mongoose=require("mongoose")
const Schema=mongoose.Schema
const resultSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    Topic:{
        type:String,
        required:true
    },
    instructor:{
        type:String,
        required:true
    },
    score:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const ResultModal=mongoose.model('Result',resultSchema)
module.exports=ResultModal