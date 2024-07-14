const express = require('express');
const MessageController = require('../Controllers/MessageController')

const router = express.Router()

router.post('/SendMessage', MessageController.CreateMessage)
router.get('/GetMessages', MessageController.GetMessagesCurrent)

module.exports = router