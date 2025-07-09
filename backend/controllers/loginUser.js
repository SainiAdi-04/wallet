const { JWT_SECRET } = require("../config");
const User = require("../db");
const zod = require('zod');
const jwt=require('jsonwebtoken')

const signIn = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const token=(userId)=>{
    return jwt.sign({id:userId},JWT_SECRET,{expiresIn:"10d"})
}


const loginUser = async (req, res) => {
    try{
    const parsedData = signIn.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const {username,password}=parsedData.data;

    const user=await User.findOne({
        username,
        password
    })

    if(user){
        res.json({token:token})
        return;
    }
    }catch(err){
    return res.status(411).json({
    message: "Error while logging in"
    })
}
}

    module.exports = {
        loginUser
    }