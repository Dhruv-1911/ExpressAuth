const express = require("express")
const router = express()
const userController = require("../controller/userController")

router.post("/register", userController.userRegistration);
router.post("/login", userController.userLogin);


module.exports = router