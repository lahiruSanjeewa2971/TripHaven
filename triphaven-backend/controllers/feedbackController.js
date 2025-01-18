const Feedback = require("../models/Feedback");
const Destination = require("../models/Place");
const User = require("../models/User");

const addNewFeedback = async (req, res) => {
    try {
        const { userId, feedback, rating, destination } = req.body;

        const checkDestinationExist = await Destination.findOne({ _id: destination })

        if (!checkDestinationExist) return res.status(404).json({
            success: false,
            message: 'This destination is not in our system.'
        })

        const checkUserNameExist = await User.findOne({ _id: userId })
        if (!checkUserNameExist) return res.status(404).json({
            success: false,
            message: 'This user name is not in our system.'
        })

        const newFeedback = new Feedback({
            userId, feedback, rating, destination
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

    } catch (error) {
        console.log('Error in getFeedbacksByDestinationId :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}


module.exports = { addNewFeedback, getFeedbacksByDestinationId }
