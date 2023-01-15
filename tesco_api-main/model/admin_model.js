const mongoose=require('mongoose')
const Schema=mongoose.Schema
const adminSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})
const AdminModal=mongoose.model('Admin',adminSchema)
module.exports=AdminModal