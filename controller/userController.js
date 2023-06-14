const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    userRegistration: async (req, res) => {
        try {
            const { name, email, password, confirm_password } = req.body
            const user = await User.findOne({ email: email })
            if (user) {
                res.status(400).json({
                    message: "email already in use"
                })
            }
            else {
                if (name && email && password && confirm_password) {
                    if (password === confirm_password) {
                        const hash = await bcrypt.hash(password, 10)
                        const user = new User({
                            name: name,
                            email: email,
                            password: hash
                        })
                        await user.save()
                        res.status(200).json({
                            message: "User successfully register 😎"
                        })
                    }
                    else {
                        res.status(404).json({
                            message: "password & confirm_password are not Match 😕"
                        })
                    }
                }
                else {
                    res.status(404).json({
                        message: "all fields are required"
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    },

    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await User.findOne({ email: email })
                console.log(user);
                if (!user) {
                    res.status(400).json({
                        message: "email not register"
                    })
                }
                else {
                    const match = await bcrypt.compare(password, user.password)
                    console.log(match);
                    if ((email === user.email) && match) {
                        res.status(200).json({
                            message: "login successfully 😎"
                        })
                    }
                    else {
                        res.status(400).json({
                            message: "email & password are not same 😕"
                        })
                    }
                }
            }
            else {
                res.status(404).json({
                    message: "all fields are required"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    }
}