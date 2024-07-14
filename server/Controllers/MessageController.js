const Message = require('../Models/Message');

const MessageController = {
    CreateMessage: async (req, res) => {
        try{
            console.log(req.body)
            const msgContent = req.body.Msg.MessageSend;
            console.log(msgContent)

            const NewMessage = new Message ({
                sender: req.body.EmailUser,
                receiver: req.body.CurrentChat,
                messgaeContent: msgContent,
            })

            const NewMessageCreateed = NewMessage.save()
            
        }   
        catch (err) {
            console.log(err)
        }
    },

    GetMessagesCurrent: async (req, res) => {
        try{

        }
        catch (err) {
            console.log(err)
        }
    }
    
}

module.exports = MessageController