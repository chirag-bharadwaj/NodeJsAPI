const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    }
},
{
    timestamps: true
}   
)

module.exports = mongoose.model('User', userSchema)
