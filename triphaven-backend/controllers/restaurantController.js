const Restaurant = require('../models/Restaurant');
const Town = require('../models/Town');

const createRestaurant = async (req, res) => {
    try {
        const { restaurantName, image, cuisine, town, rating, description } = req.body;

        const checkTown = await Town.findById(town);
        if (!checkTown) return res.status(404).json({
            success: false,
            message: "This town is not found in out system."
        })

        const newRestaurant = new Restaurant({
            restaurantName, image, cuisine, town, rating, description
        })
        const saveRestaurant = await newRestaurant.save();
        if (saveRestaurant) {
            res.status(200).json({
                success: true,
                message: 'New restaurant was added to the list.',
                data: saveRestaurant
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong.'
            })
        }

    } catch (error) {
        console.log("Error in createRestaurant :", error)
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }
}

const getFullList = async (req, res) => {
    try {
        const restaurantList = await Restaurant.find();

        res.status(200).json({
            success: true,
            data: restaurantList
        })
    } catch (error) {
        console.log('Error in getFullList :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}

const getRestaurantsByTown = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurants = await Restaurant.find({ town: id })
        res.status(200).json({
            success: true,
            data: restaurants
        })
    } catch (error) {
        console.log('Error in getRestaurantsByTown :', error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
}

module.exports = { createRestaurant, getFullList, getRestaurantsByTown }