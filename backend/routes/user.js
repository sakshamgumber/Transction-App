const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const { User,Account } = require("../db");
const { secret }=require("../config");
const { middleware }=require("../middleware");
const { raw } = require("body-parser");
const router=express.Router();
const signup=zod.object({
    email:zod.string().email(),
    password:zod.string(),
    name:zod.string().min(1),
    amount:zod.string()
})
router.post('/signup',async (req,res)=>{
    console.log(req.body)
    const {success}=signup.safeParse(req.body);
    // console.log(success);
    if (!success){
        return res.json({
            msg:"you sent the wrong information"
        })
    }
    const exist=await User.findOne({
        email:req.body.email
    })
    console.log
    if (exist){
        res.status(411).json({msg:"username already exists"})
        return;
    }
    const user=await User.create({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    })
    const userId=user._id;
    const token=jwt.sign({userId},secret);
    res.json({
        message: "User created successfully",
        token:token
    })
    const account=await Account.create({
        userId,
        balance:req.body.amount
    })
})
const verifi=zod.object({
    email:zod.string().email(),
    password:zod.string()
})
router.post('/signin',async (req,res)=>{
    const {success}=verifi.safeParse(req.body);
    console.log(success);
    if (!success){
        res.json({})
    }
    const signin=await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    console.log(signin)
    if (signin) {
        const token = jwt.sign({
            userId:signin._id
        }, secret);
        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({"msg":"your input was wrong "})
})
const updateBody = zod.object({
	password:zod.string(),
    name:zod.string()
})

router.put("/update",middleware, async (req, res) => {
    console.log("hi");
    const  { success }  = updateBody.safeParse(req.body);
    if (!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }
    console.log(req.password);
    const updated=await User.findByIdAndUpdate(req.userId, { $set: { password: req.body.password, name: req.body.name } }, { new: true });
    console.log(updated.password);
    res.json({
        message: "Updated successfully"
    })
})
router.get('/bulk', async (req, res) => {
    try {
      const { name } = req.query;
      const results = await User.find({name:new RegExp(name,'i')});
      console.log(results);
      res.json({
        user: results.map(user => ({
            username: user.username,
            name:user.name,
            _id: user._id
        }))
    })
    //   res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports=router;