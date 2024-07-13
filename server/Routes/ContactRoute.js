const express = require('express');
const ContactController = require('../Controllers/ContactController')

const router = express.Router()

router.post('/StartContact/:id', ContactController.ContactStart)

module.exports = router