const jwt = require('jsonwebtoken')

const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const decode = jwt.verify(authHeader.split(' ')[1], 'JWT_SECRET')
        const userRole = decode.role;


        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied, Unauthorized..'
            })
        }
        next();
    }
}

module.exports = { authorizeRole }
