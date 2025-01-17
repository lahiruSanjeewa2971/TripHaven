const express = require('express')
const { getFeedbacksByDestinationId, addNewFeedback } = require('../controllers/feedbackController')
const { authenticate } = require('../middlewares/authMiddleware')

const router = express.Router()

// only authenticated users
router.post('/add', authenticate, addNewFeedback)

// common routes
router.get('/get-feedback-for-destination/:destinationId', getFeedbacksByDestinationId)


module.exports = router
