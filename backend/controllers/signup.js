const User=require('../db')
const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const zod=require('zod');
const bcrypt=require('bcryptjs')
const Account=require('../db')

const signUpBody=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

const token=(userId)=>{
    return jwt.sign({id:userId},JWT_SECRET,{expiresIn:"10d"})
}

const signUp= async (req,res)=>{
    try{

        const parsedData=signUpBody.safeParse(req.body);
        if(!parsedData.success){
            return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
        }

        const {username,firstName,lastName,password}=parsedData.data;
        const userExists=await User.findObe({username});

        if(userExists){
            return res.status(411).jsoon({message:"Email already taken / Incorrect inputs"})
        }

        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);
        

        const balance=Math.floor(Math.random()*10000)+1;

        const user=await User.create({
            username,
            password:hash,
            firstName,
            lastName
        })

        const userId=user._id;
        
        const acBalance= await Account.create({
            userId,
            balance
        })

        res.status(200).json({
            message:"User created successfully",
            acBalance,
            token:token(userId)
        })
    }catch(error){
        res.status(401).json({message:"Error registering the user.",error})
    }
}

module.exports={
    signUp
}