const Feedback = require("../models/Feedback");
const Destination = require("../models/Place");
const User = require("../models/User");

const addNewFeedback = async (req, res) => {
    try {
        const { userId, feedback, rating, referenceId, referenceType } = req.body;

        if (!['town', 'restaurant', 'destination'].includes(referenceType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid feedback type."
            })
        }

        const checkUserNameExist = await User.findOne({ _id: userId })
        if (!checkUserNameExist) return res.status(404).json({
            success: false,
            message: 'This user name is not in our system.'
        })

        const newFeedback = new Feedback({
            userId, feedback, rating, referenceId, referenceType
        })
        const saveFeedback = await newFeedback.save()

        if (saveFeedback) {
            res.status(200).json({
                success: true,
                message: 'Your feedback was recorded.',
                data: saveFeedback
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong.'
            })
        }
    } catch (error) {
        console.log('Error in addNewFeedback :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}

const getFeedbacksByDestinationId = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const feedbacks = await Feedback.find({ destination: destinationId }).populate('userId', 'userName');
        if (feedbacks) {
            res.status(200).json({
                success: true,
                data: feedbacks
            })
        }
    } catch (error) {
        console.log('Error in getFeedbacksByDestinationId :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}

const getFeedbackByReferenceId = async (req, res) => {
    try {
        const { referenceId } = req.params;
        const feedbacks = await Feedback.find({ referenceId }).populate('userId', 'userName');
        if (feedbacks) {
            res.status(200).json({
                success: true,
                data: feedbacks
            })
        }
    } catch (error) {
        console.log('Error in getFeedbackByReferenceId :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}


module.exports = { addNewFeedback, getFeedbacksByDestinationId, getFeedbackByReferenceId }
