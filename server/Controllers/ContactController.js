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

            const CreateCon = NewConnection.save()
            
            if(CreateCon){
                return res.json({ Status: "Success"})
            }
            else{
                return res.json({ Error: "Internel Server Error"})
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = ContactController;