
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.startsWith("Bearer")) {

           let token = authorization.split(" ")[1]
            if (token) {

                let { Role } = jwt.verify(token, process.env.JWT_SECRET)

                if (Role === "User") {
                    return next();
                }
                else {
                    res.status(404).json({
                        message: "You have to login with user!!"
                    })
                }
            }
        }
        else {
            res.status(404).json({
                message: "Token must be required..."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong in auth"
        })
    }
}