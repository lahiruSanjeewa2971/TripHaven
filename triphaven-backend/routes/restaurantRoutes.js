const express = require('express')
const { createRestaurant, getFullList, getRestaurantsByTown, getRestaurantsWithTownAdded, getRestaurantDataByRestaurantId } = require('../controllers/restaurantController')
const { authenticate } = require('../middlewares/authMiddleware')
const { authorizeRole } = require('../middlewares/roleMiddleware')

const router = express.Router()

// restaurantOwner only
router.post('/add', authenticate, authorizeRole(["restaurantOwner"]), createRestaurant)
// router.post('/add', createRestaurant)

// common routes
router.get('/get', getFullList)
router.get('/get-restaurants-with-town', getRestaurantsWithTownAdded)
router.get('/get-by-town/:id', getRestaurantsByTown)
router.get('/get-by-restaurant-id/:id', getRestaurantDataByRestaurantId)

module.exports = router