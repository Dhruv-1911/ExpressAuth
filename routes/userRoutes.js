const express = require("express")
const router = express()
const userController = require("../controller/userController");
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/adminAuth")

router.post("/register", userController.userRegistration);
router.post("/login", userController.userLogin);
router.post("/changespassword", adminAuth, userController.changePassword)

router.get("/loggeduser", auth, userController.loggedUser)


module.exports = router