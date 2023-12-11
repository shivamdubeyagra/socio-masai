const express = require("express");
const { PostModel } = require("../models/post.model");
const postRouter = express.Router();

postRouter.post("/add", async(req,res)=>{
    try{
        const newpost = new PostModel(req.body);
        await newpost.save();
        res.send(newpost)
    }catch(err){
        res.status(400).send("something went wrong");
    }
})
postRouter.get("/",async(req,res)=>{
    const device = req.query;
    console.log(device);
    try{
        const users = await PostModel.find(device);
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong");
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
        const {id} = req.params;
        const {title,body,device} = req.body;
        try{
            const user = await PostModel.findByIdAndUpdate({_id:id},req.body);
            await user.save();
            res.send(user);
        }catch(error){
            res.status(400).send("something went wrong");
        }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await PostModel.findByIdAndDelete({_id:id});
        res.send(user);
    }catch(error){
        res.status(400).send("something went wrong");
    }
})


module.exports = {postRouter}