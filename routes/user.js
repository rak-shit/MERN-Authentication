const express = require('express')
const userCtrl = require('../controller/user')
const router = express.Router()
const auth = require('../middleware/auth')

router.post(
    '/signup', 
    userCtrl.createUser
)

router.post(
    '/login', 
    userCtrl.loginUser
)

router.get(
    '/',
    auth,
    userCtrl.getUser
)

module.exports = router