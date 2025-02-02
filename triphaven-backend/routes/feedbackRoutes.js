const express = require('express')
const { getFeedbacksByDestinationId, addNewFeedback, getFeedbackByReferenceId } = require('../controllers/feedbackController')
const { authenticate } = require('../middlewares/authMiddleware')

const router = express.Router()

// only authenticated users
router.post('/add', authenticate, addNewFeedback)

// common routes
// ✅ Get feedback for a specific entity (town, restaurant, or destination)
router.get('/get-feedback-for/:referenceId', getFeedbackByReferenceId);


module.exports = router
