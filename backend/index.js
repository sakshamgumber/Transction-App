const express=require("express");
const bodyparser=require('body-parser');
const mainRouter = require("./routes/index");
const app=express();
const cors=require("cors");
// now using middle wares here like cors and bodyoparser
app.use(cors());
app.use(bodyparser.json());
app.use('/api/v1',mainRouter);


// all ports listening on it
app.listen(3000,()=>{
    console.log("your port is running on port 3000")
});