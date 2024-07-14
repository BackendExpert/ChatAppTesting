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
            // console.log(req.params)   
            const { emal, id } = req.params

            const GetConnectionMsgs = await Message.find({
                $and: [
                    { sender: emal },
                    { receiver: id }
                  ]
            })

            if(GetConnectionMsgs) {
                return res.json({ Result: GetConnectionMsgs })
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    
}

module.exports = MessageController