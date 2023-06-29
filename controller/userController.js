const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    //this registration api
    userRegistration: async (req, res) => {
        try {
            const { name, email, password, confirm_password, Role } = req.body
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
                            password: hash,
                            Role: Role
                        })
                        await user.save()
                        const token = jwt.sign({ userId: user._id, Role: user.Role }, process.env.JWT_SECRET, { expiresIn: "1d" })
                        res.status(200).json({
                            message: "User successfully register 😎",
                            Token: token
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

                if (!user) {
                    res.status(400).json({
                        message: "email not register"
                    })
                }
                else {
                    const match = await bcrypt.compare(password, user.password)

                    if ((email === user.email) && match) {
                        const token = jwt.sign({ userId: user._id, Role: user.Role }, process.env.JWT_SECRET, { expiresIn: "1d" })
                        res.status(200).json({
                            message: "login successfully 😎",
                            "Token": token
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
    },

    changePassword: async (req, res) => {
        try {
            const { password, confirm_password } = req.body
            if (password && confirm_password) {
                if (password !== confirm_password) {
                    res.status(400).json({
                        message: "You entered password & confirm_password Must be Same"
                    })
                }
                else {
                    const hash = await bcrypt.hash(password, 10)
                    id = req.userId
                    await User.findByIdAndUpdate(id, {
                        password: hash
                    })
                    res.status(200).json({
                        message: "Your Password changed.."
                    })
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
    },

    loggedUser: async (req, res) => {
        try {
            id = req.userId
            let user = await User.findById(id)

            res.json({
                "user": user
            })
        } catch (error) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    },

    getAlluser: async (req, res) => {
        try {
            const user = await User.find({})
            res.status(200).json({
                message: "here all are users",
                user: user
            })
        } catch (error) {
            res.status(500).json({
                message: "somthing went wrong"
            })
        }
    }

}