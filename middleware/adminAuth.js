const jwt = require("jsonwebtoken")

// module.exports = async (req, res, next) => {
//     if (token) {
//         jwt.verify(token, jwtSecret, (err, decodedToken) => {
//             if (err) {
//                 return res.status(401).json({ message: "Not authorized" })
//             } else {
//                 if (decodedToken.role !== "admin") {
//                     return res.status(401).json({ message: "Not authorized" })
//                 } else {
//                     next()
//                 }
//             }
//         })
//     } else {
//         return res
//             .status(401)
//             .json({ message: "Not authorized, token not available" })
//     }
// }

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.startsWith("Bearer")) {

            let token = authorization.split(" ")[1]

            let { Role } = jwt.verify(token, process.env.JWT_SECRET)

            if (Role === "Admin") {
                return next();
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong in auth"
        })
    }
}