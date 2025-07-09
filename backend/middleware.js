const User=require("./db")
const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware=async(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(token && token.startsWith("Bearer")){
            token=token.split(' ')[1];
            const decoded=jwt.verify(token, JWT_SECRET);
            req.id=decoded.id;
            next();
        }else{
            return res.status(401).json({message:"First signup"})
        }
    }catch(err){
        return res.status(403).json({})

    }
}

module.exports=authMiddleware;