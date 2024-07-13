const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


const authController = {
    SignUp: async (req, res) => {
        try{
            const {username, email, password} = req.body.SignUpData
                        
            // check user is in database
            const CheckUser = await User.findOne({ email, username })

            if(CheckUser) {
                return res.json({ Error: "User Already in database"})
            }
            const hashPass = await bcrypt.hash(password, 10);

            const NewUser = new User({
                username: username,
                email: email,
                password: hashPass,
                Role: "User",
            })

            const ResultUser = NewUser.save()

            if(ResultUser) {
                return res.json({ Status: "Success"})
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

module.exports = authController;