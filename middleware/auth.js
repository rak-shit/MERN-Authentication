const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'process.env.JWT_SECRET')
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        })
        if (!user) {
            res.status(403).json({ message: 'UserNotFound' })
        } else {
            req.token = token,
            req.user = user
            next()
        }
    } catch (error) {
        res.status(403).json({ error: error })
        console.log(error)
    }
}

module.exports = auth

