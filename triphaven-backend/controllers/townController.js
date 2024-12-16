const Town = require("../models/Town");

const addNewTown = async (req, res) => {
    try {
        const { townName, description, image } = req.body;
        const checkExisting = await Town.findOne({ townName })
        if (checkExisting) return res.status(400).json({
            success: false,
            message: "This city name exist in the list."
        })

        const newTown = new Town({ townName, image, description })
        const saveTown = await newTown.save();

        if (saveTown) {
            res.status(200).json({
                success: true,
                message: 'New city was added to the list.',
                data: saveTown
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong.'
            })
        }
    } catch (error) {
        console.log('Error in addNewTown :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}

const getAllTowns = async (req, res) => {
    try {
        const townsList = await Town.find();

        res.status(200).json({
            success: true,
            data: townsList
        })
    } catch (error) {
        console.log('Error in getAllTowns :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}

const getTownDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const townDetails = await Town.findById(id);

        if (!townDetails) {
            return res.status(404).json({
                success: false,
                message: "No city found."
            })
        }

        res.status(200).json({
            success: true,
            data: townDetails
        })
    } catch (error) {
        console.log('Error in getTownDetailsById :', error);
        res.status(500).json({
            success: false,
            message: 'Some error occured.'
        })
    }
}

module.exports = { addNewTown, getAllTowns, getTownDetailsById }
