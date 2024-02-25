const dbURL = 'mongodb+srv://chiragcr2one:Chiragcr21@cluster0.nnkx8mc.mongodb.net/?retryWrites=true&w=majority'

const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const routes = require('./Services');
const bodyParser = require('body-parser')
const user = require('./Models/user')

app.use('/', routes);


mongoose.connect(dbURL, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
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


module.exports = app;

