const Contact = require('../Models/Contact');

const ContactController = {
    ContactStart: async(req, res) => {
        try{
            const userEmail = req.params.id;
            console.log(userEmail, req.body.addtoContact)
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContactController;