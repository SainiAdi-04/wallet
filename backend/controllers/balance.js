const Account=require("../db")

const balance=async(req,res)=>{
    const acBalance= await Account.findOne({
        userId:req.id
    })
    res.status(200).json({
        balance:acBalance.balance
    })
}

module.exports=balance
