const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    messgaeContent: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message