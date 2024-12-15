const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'traveler', 'restaurantOwner'],
        default: 'traveler'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User