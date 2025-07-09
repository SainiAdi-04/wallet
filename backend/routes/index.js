const express=require('express');
const router=express.Router();
import {accountRouter} from './account';
import {userRouter} from './user';

router.use("/user",userRouter);
router.use("/account", accountRouter);

module.exports={
    router
}