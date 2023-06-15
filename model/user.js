const mongoose = require("mongoose");

//create a Admin database
const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
    password: { type: String, required: true, trim: true },
    Role: { type: String,  default:"User", enum: ["Admin", "User"] }

});

module.exports = mongoose.model('User', userSchema)
