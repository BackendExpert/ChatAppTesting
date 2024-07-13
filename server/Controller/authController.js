const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User')

const authController = {
    SignUp: async (req, res) => {
        // console.log(req.body)
        const {
            username,
            email,
            password,
        } = req.body;

        User.findByUsernameOrEmail(username, email, async (err, result) => {
            if(err) throw err

            if(result.length > 0){
                return res.json({ Error: "User is Already Exists" })
            }
            else{
                const hashPass = await bcrypt.hash(password, 10)
                // console.log(hashPass)
                if(hashPass){
                    const newUser = User.create({
                        username: username,
                        email: email,
                        password: hashPass,
                        role: "User",
                        create_at: new Date(),
                        is_active: 1,
                        is_lock: 0
                    })

                    return res.json({ Status: "Success" })
                }
                else{
                    return res.json({ Error: "Error White Hashing Password" })
                }
            }
        })
    },
    SignIn: (req, res) => {
        // console.log(req.body)

        const {
            email,
            password
        } = req.body;

        User.findByEmail(email, (err, result) => {
            if(err) throw err

            if(result.length === 0){
                return res.json({ Error: "User not Found,..." })
            }

            const person = result[0]

            bcrypt.compare(password, person.password, (err, passMatch) => {
                if(err) throw err

                if(!passMatch) {
                    return res.json({ Error: "Password not Match" })
                }
                else{
                    const token = jwt.sign({ email: person.email }, 'your_jwt_secret', { expiresIn: '1h' })
                    return res.json({ Msg: "Success", Token:token, LoginUser:result })
                }
            })
        })

    }
}

module.exports = authController;
