const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017");


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    }
})
const accountschema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId
    ,ref:"user",
    required:true
},
    balance:{
        type:Number,
        required:true
    }
})
const User=mongoose.model('User',userSchema);
const Account=mongoose.model('Account',accountschema);
module.exports={
    User,Account
};