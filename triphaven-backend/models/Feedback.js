const mongoose = require('mongoose')

const feedbackSchema = ({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, default: 0 },
    referenceId: { type: mongoose.Schema.ObjectId, required: true },
    referenceType: { type: String, enum: ['town', 'restaurant', 'destination'], required: true },
    // destination: {type: mongoose.Schema.ObjectId, ref: 'Destination', required: true},
})

const Feedback = mongoose.model('Feedback', feedbackSchema)
module.exports = Feedback