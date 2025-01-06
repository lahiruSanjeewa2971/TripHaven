const express = require('express')
const { addNewTown, getAllTowns, getTownDetailsById, getTownWithRestaurant } = require('../controllers/townController')
const { authenticate } = require('../middlewares/authMiddleware')
const { authorizeRole } = require('../middlewares/roleMiddleware')

const router = express.Router()

// admin only
// router.post('/add', addNewTown)
router.post('/add', authenticate, authorizeRole(['admin']), addNewTown)

// common toute
router.get('/get', getAllTowns)
router.get('/get/details/:id', getTownDetailsById)
router.get('/get-town-with-restaurant/:townId', getTownWithRestaurant)

module.exports = router
