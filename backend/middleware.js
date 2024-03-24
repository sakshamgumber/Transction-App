const { secret }=require("./config");
const { User }=require("./db")
const jwt=require("jsonwebtoken");
const middleware=async (req,res,next)=>{
    const token=req.headers.authorisation;
    // console.log("hi")
    if (!token){
        res.status(403).json({ });
        return;
    }
    const decoded=jwt.verify(token,secret);
    const id=await User.findById({
       _id:decoded.userId
    })
    if (!id){
        res.json({message:"your user id was incorrect"});
        return;
    }
    req.userId=id._id;
    // if (decoded.userId!=req.userId){
    //     console.log(req.userId);
    //     res.status(403).json({
    //         msg:"your user id was incorrect"
    //     })
    // }
    next();
}
module.exports={
    middleware
};