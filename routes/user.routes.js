const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body;
    try{
        const existUser = await UserModel.findOne({email});
        if(existUser){
            return res.status(400).send('User already present. Try to login');
        }
        bcrypt.hash(password,8,async(err,hash)=>{
            if(hash){
                const newUser = new UserModel({
                    name,email,gender,password:hash
                })
                await newUser.save();
                return res.status(200).send("User has been registered")
            }else{
                return res.status(400).send('Something went wrong');
            }
        })
    }catch(error){
        return res.status(400).send('Something went wrong');
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(200).send("first register then try to login.")
        }
        bcrypt.compare(password, user.password,(err,result)=>{
            if(result){
                const token = jwt.sign({userId:user._id},"shivamdubey");
                return res.status(200).send({"msg":"Login Successful","token":token});
            }else{
                return res.status(400).send('Invalid Credentials');
            }
        })
    }catch(error){
        return res.status(400).send('Something went wrong');
    }
})
module.exports={userRouter}