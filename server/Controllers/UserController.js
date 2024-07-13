const User = require('../Models/User')
const Contact = require('../Models/Contact')

const UserController = {
    GetAllUsers: async (req, res) => {
        try{
            const connections = await Contact.find();
            const connectionEmails = new Set();

            connections.forEach(conn => {
                connectionEmails.add(conn.starter);
                connectionEmails.add(conn.receiver);
            });

            const nonUserConnection = await User.find({
                email: { $nin: Array.from(connectionEmails) }
            });

            if(nonUserConnection){
                return res.json({ Result: nonUserConnection })
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

module.exports = UserController