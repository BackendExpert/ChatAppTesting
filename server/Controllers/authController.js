const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


const authController = {
    SignUp: async (req, res) => {
        try{
            const {username, email, password} = req.body
            // console.log(req.body)
                        
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
    },
    SigIn: async (req, res) => {
        try{
            const { email, password } = req.body;

            const checUser = await User.findOne({ email })

            if(checUser) {
                const checkPass = await bcrypt.compare(password, checUser.password)

                if(checkPass){
                    // create a token for login
                    const token = jwt.sign({ userId: checUser._id, userEmail: checUser.email, userRole: checUser.Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    
                    return res.json({Status: "Success", Token:token, Result: checUser})    
                }
                else{
                    return res.json({ Error: "Password is not Match..." })
                }
            }
            else{
                return res.json({ Error: "No user Found..."})
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = authController;