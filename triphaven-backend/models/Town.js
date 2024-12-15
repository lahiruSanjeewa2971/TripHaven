const mongoose = require('mongoose')

const townSchema = new mongoose.Schema({
    townName: { type: String, requied: true, unique: true },
    description: { type: String },
})

const Town = mongoose.model('Town', townSchema)
module.exports = Town