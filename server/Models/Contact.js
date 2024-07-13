const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    starter: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact