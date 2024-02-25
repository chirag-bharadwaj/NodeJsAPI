const express = require('express');
const router = express.Router();
const user = require('../Models/user');

router.post('/createUser', async (req, res)=>{
    try {
        const {userName, email, age} = req.body
        const userAccount = new user({
            userName, email, age
        })
        await userAccount.save();
        res.status(201).send(userAccount)
    } catch (error) {
        console.log("Error", error);
    }
})

module.exports = router