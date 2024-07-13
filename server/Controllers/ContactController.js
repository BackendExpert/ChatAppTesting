const Contact = require('../Models/Contact');

const ContactController = {
    ContactStart: async(req, res) => {
        try{
            const userEmail = req.params.id;
            const { contactUser } = req.body;

            
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContactController;