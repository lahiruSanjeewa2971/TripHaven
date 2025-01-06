const express = require('express')
const { createRestaurant, getFullList, getRestaurantsByTown } = require('../controllers/restaurantController')
const { authenticate } = require('../middlewares/authMiddleware')
const { authorizeRole } = require('../middlewares/roleMiddleware')

const router = express.Router()

// restaurantOwner only
router.post('/add', authenticate, authorizeRole(["restaurantOwner"]), createRestaurant)
// router.post('/add', createRestaurant)

// common routes
router.get('/get', getFullList)
router.get('/get-by-town/:id', getRestaurantsByTown)

module.exports = router