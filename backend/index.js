const express = require("express");
const cors=require('cors');
const app=express();


app.use(cors());
app.use(express.json())

const rootRoute=("./routes/index");


app.use("/api/v1", rootRoute);

const PORT=3000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));


