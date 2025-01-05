const mongoose = require('mongoose')

const townSchema = new mongoose.Schema({
    townName: { type: String, requied: true, unique: true },
    image: { type: String, required: true },
    description: { type: String },
    rating: {type: Number, default: 0}
})

const Town = mongoose.model('Town', townSchema)
module.exports = Town