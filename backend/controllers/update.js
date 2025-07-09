const { User } = require("../db");
const zod=require('zod');


const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
});


const updateInfo=async(req,res)=>{
    try{
        const updated=updateBody.safeParse(req.body);
        if(!updated.success){
            return res.status(411).json({message:"Error updating the info"})
        }

        const updatedData=updated.data;
        const userId=req.id;
        const user= await User.updateOne({_id:userId},{$set:updatedData});

        if(user.modifiedCount===0){
            return res.status(404).json({message:"User not found"})
        }
        res.json({message:"Info Updated"});

    }catch(err){
        return res.status(411).json({})
    }

}

module.exports=updateInfo





