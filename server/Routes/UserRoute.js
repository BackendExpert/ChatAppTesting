const express = require('express');
const UserController = require('../Controllers/UserController')

const router = express.Router()

router.get('/GetAllUser/:id', UserController.GetAllUsers)

module.exports = router