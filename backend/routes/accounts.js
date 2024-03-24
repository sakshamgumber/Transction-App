const express=require("express");
const { Account }=require("../db");
const router =express.Router();
const { middleware }=require("../middleware");
const mongoose=require("mongoose");
router.get("/balance",middleware,async (req, res) => {
    console.log("hi")
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance,
    })
});
router.post("/transfer", middleware, async (req, res) => {
    const { amount, to } = req.body;
    // console.log(amount);
    const account = await Account.findOne({
        userId: req.userId
    });
    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({
        userId: to
    });
    console.log(toAccount);
    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account",
        })
    }
    const senderMoney=await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })
    console.log(amount);
    const ReceiverMoney=await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })
    res.json({
        message: "Transfer successful",
        amount:senderMoney.balance
    })
});

module.exports=router;