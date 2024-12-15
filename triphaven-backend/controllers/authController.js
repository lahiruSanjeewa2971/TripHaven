const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existingUser) return res.status(400).json({ success: false, message: "User name or email already taken." })

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, email, password: hashPassword })
    await newUser.save()

    return res.status(200).json({ success: true, message: 'User registerd successfully.' })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email })

    if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials."
        })
    }

    // generate a JWT token for the login sssion
    const accessToken = jwt.sign({
        _id: checkUser._id,
        email: checkUser.email,
        userName: checkUser.userName,
        role: checkUser.role
    }, 'JWT_SECRET', { expiresIn: '800m' })

    return res.status(200).json({
        success: true,
        message: 'Logged in successfull.',
        data: {
            accessToken,
            user: {
                _id: checkUser._id,
                email: checkUser.email,
                userName: checkUser.userName,
                role: checkUser.role
            }
        }
    })
}

module.exports = { registerUser, loginUser }