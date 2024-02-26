const dbURL = 'mongodb+srv://chiragcr2one:Chiragcr21@cluster0.nnkx8mc.mongodb.net/?retryWrites=true&w=majority'

const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const routes = require('./Services');
const bodyParser = require('body-parser')
const user = require('./Models/user')

app.use('/', routes);


mongoose.connect(dbURL, {useNewUrlParser: true}).then(()=>{
    console.log("DB Connected...");
}).catch((err)=>{
    console.log("Error",err);
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());
app.listen(PORT, ()=>{
    console.log("Connected");
});
app.get('/test', (req, res)=>{
    res.send("Testing...")
})

app.get('/findUser', async (req, res)=>{
    const {userId} = req.body
    // find user by email
    const findUser = await user.find({userName: userId})
    console.log("findUser:", findUser);
    if(findUser){
        console.log(findUser);
        res.send(findUser)
    }else{
        console.log("User Not Found", findUser);
    }

})

app.get('/findUserById/:id', async (req, res)=>{
    const userId = req.params.id
    const findId = await user.findById({userId})
    if(findId){
        res.send(findId)
    }else{
        console.log("User Not found", findId);
    }
})

app.post('/signUp', async (req, res)=>{
    try {
        const {userName, email, age, password} = req.body
        const varifyUser = await user.findOne({userName: userName})
        if(varifyUser)
            return res.status(401).json({message: "User Already exist with this email"})

            const hashPassword = await bcrypt.hash(password, 12)
            const newUser = new user({userName, email, age, password: hashPassword})
            await newUser.save()
            return res.status(200).json({Message: "New User Created successfully", newUser})
            
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
    
})

app.get('/allUser', async (req, res)=>{
    try {
        const age = req.body.age
        const allUsers = await user.find({age: {$lt: age} }).select('userName')
        res.status(201).json({message: "List of Users", allUsers})
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
        
    }
})

app.get('/userCount', async (req,res)=>{
    try {
        const count = await user.find({}).sort({updatedAt: 1})
        res.status(201).json({message: "User Count is:", count})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
})

app.put('/updateUserName/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const {userName} = req.body
        const updateUser = await user.findByIdAndUpdate(id, {userName} , {new: true} )

        if(!updateUser){
            return res.status(404).json({message: "No User Found"})
        }
        res.status(200).json({message: "user updated successfully", updateUser})
    } catch (error) {
        
    }
})

app.delete('/deleteUser/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const deleteUserId = await user.findByIdAndDelete(id)
        if(!deleteUserId){
            return res.status(404).json({message: "No User Found"})
        }
        res.status(200).json({message: "User Deleted successfully"})
    } catch (error) {
        
    }
})

app.get('/findUserById/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const userId = await user.find(id)
        if(!userId){
            return res.status(404).json({message: "No User Found"})
        }
        res.status(200).json({message: "User Found", userId})
    } catch (error) {
        console.log("Error", error);
        res.send(error)
    }
})



module.exports = app;