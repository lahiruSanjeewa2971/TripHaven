const Destination = require('../models/Place')
const Town = require('../models/Town')

const addDestination = async (req, res) => {
    try {
        const { destinationName, image, description, town } = req.body;

        const checkDestinationExist = await Destination.findOne({ destinationName })
        if (checkDestinationExist) return res.status(400).json({ success: false, message: "This destination already in the system." })

        const checkTown = await Town.findById(town);
        if (!checkTown) return res.status(404).json({
            success: false,
            message: "This town is not found in out system."
        })

        const newDestination = new Destination({
            destinationName, image, description, town
        })
        const saveDestination = await newDestination.save();

        if (saveDestination) {
            res.status(200).json({
                success: true,
                message: 'New destination was added to the list.',
                data: saveDestination
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong.'
            })
        }
    } catch (error) {
        console.log('Error in addDestination :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}

const getDestinationList = async (req, res) => {
    try {
        const destinationList = await Destination.find().populate('town', 'townName');

        res.status(200).json({
            success: true,
            data: destinationList
        })
    } catch (error) {
        console.log('Error in getDestinationList :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}


module.exports = { addDestination, getDestinationList }
