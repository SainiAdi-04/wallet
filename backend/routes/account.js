const express=require('express');
const authMiddleware = require('../middleware');
const balance = require('../controllers/balance');
const Transfer = require('../controllers/transfer');
const accountRouter=express.Router();

accountRouter.get("/balance", authMiddleware, balance)
accountRouter.post("/transfer", authMiddleware, Transfer)

module.exports=accountRouter;