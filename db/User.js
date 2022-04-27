const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    notify:Boolean,
});
module.exports=mongoose.model("users",userSchema);