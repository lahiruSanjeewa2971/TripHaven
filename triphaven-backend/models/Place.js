const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    destinationName: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    town: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
})

const Destination = mongoose.model("Destination", destinationSchema)
module.exports = Destination