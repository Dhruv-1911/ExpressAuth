const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.startsWith("Bearer")) {

            let token = authorization.split(" ")[1]

            let { userId } = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = userId
            next();
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            message: "somthing went wrong in auth"
        })
    }
}