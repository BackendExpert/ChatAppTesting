const User = require('../Models/User')

const UserController = {
    GetAllUsers: async (req, res) => {
        try{
            console.log(req.params)
            // const allUser = await User.find()

            // if(allUser) {
            //     return res.json({ Result: allUser })
            // }
            // else{
            //     return res.json({ Error: "Internal Server Error"})
            // }
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = UserController