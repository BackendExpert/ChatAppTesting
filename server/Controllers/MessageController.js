const Message = require('../Models/Message');

const MessageController = {
    CreateMessage: async (req, res) => {
        try{
            console.log(req.body)
        }   
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = MessageController