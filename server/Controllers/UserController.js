const User = require('../Models/User')
const Contact = require('../Models/Contact')

const UserController = {
    GetAllUsers: async (req, res) => {
        try{
            // console.log(req.params.id)
            const allUser = await User.find({ email: { $ne: req.params.id } })

            if(allUser) {
                return res.json({ Result: allUser })
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

module.exports = UserController