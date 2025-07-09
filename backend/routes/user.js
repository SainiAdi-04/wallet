const express=require("express");
import { signUp } from "../controllers/signup";
import { loginUser } from "../controllers/loginUser";
import authMiddleware from "../middleware";
import updateInfo from "../controllers/update";
import Filter from "../controllers/filter";

const userRouter=express.Router();

userRouter.post("/signup", signUp)
userRouter.post("/login", loginUser);
userRouter.put("/", authMiddleware, updateInfo);
userRouter.get("/bulk", Filter);


module.exports={
    userRouter
}