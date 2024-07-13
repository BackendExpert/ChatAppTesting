const Contact = require('../Models/Contact');

const ContactController = {
    ContactStart: async(req, res) => {
        try{
            const userEmail = req.params.id;
            console.log(req.body)
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContactController;