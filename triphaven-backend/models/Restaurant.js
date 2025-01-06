const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    image: { type: String, required: true },
    cuisine: { type: String },
    town: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
    rating: { type: String, default: 0 },
    description: { type: String },
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant