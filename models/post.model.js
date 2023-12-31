const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userId:String,
},{versionKey:false});


const PostModel = mongoose.model("post",postSchema);

module.exports = {PostModel};