const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
// router.get("/check-auth", authenticateMiddleware, (req, res) => {
//     const user = req.user;

//     if (user) {
//         res.status(200).json({
//             success: true,
//             message: "Authenticated user.",
//             data: { user }
//         })
//     } else {
//         res.status(200).json({
//             success: false,
//             message: "Not Authenticated user.",
//             data: { user }
//         })
//     }
// })
module.exports = router
