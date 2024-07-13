const Contact = require('../Models/Contact');

const ContactController = {
    ContactStart: async(req, res) => {
        try{
            const userEmail = req.params.id;
            const { contactUser } = req.body;

            // console.log(userEmail, contactUser)

            const ConnAlreadyhave = await Contact.findOne({
                $and: [
                    { starter: userEmail },
                    { receiver: contactUser }
                ]
            })

            if(ConnAlreadyhave) {
                return res.json({ Error: "Sorry..., This Connection is Already Exists"})
            }

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