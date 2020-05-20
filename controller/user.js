const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async (req, res, next) => {
        const user = new User(req.body)
        try {
          await user.save()
          const token = await user.generateAuthToken()
          // send email here, to activate the account
          res.status(201).json({ user: user, token: token })
        } catch (error) {
          console.log(error)
          res.status(404).json({ error: error })
        }
    },
    loginUser: async (req, res, next) => {
        const email = req.body.email
        const password = req.body.password
        try {
          const user = await User.findByCredentials(email, password)
          const token = await user.generateAuthToken()
          res.status(200).json({ user: user, token: token })
        } catch (error) {
          res.status(404).json({ error: error.message })
        }
    },
    getUser: async (req, res, next) => {
        const id = req.user.id.toString()
        try {
            const user = await User.findById(id)
            if (!user) {
                res.status(404).json({ message: 'UserNotLoggedIn' })
            }
            res.status(200).json({ user: user })
        } catch (error) {
            res.status(404).json({ error })
            console.log(error)
        }
    }
}