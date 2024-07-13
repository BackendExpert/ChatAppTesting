const Contact = require('../Models/Contact');

const ContactController = {
    ContactStart: async(req, res) => {
        try{
            const userEmail = req.params.id;
            const { contactUser } = req.body;

            const NewConnection = new Contact({
                starter: userEmail,
                receiver: contactUser
            })

            const CreateCon = await 
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContactController;