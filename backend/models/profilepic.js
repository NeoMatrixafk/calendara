const mongoose = require("mongoose");

//schema for profile picture
const profileSchema = new mongoose.Schema({
    email: { type: String },
    imageData: { type: String },
});

const profilePic = mongoose.model("profilePic", profileSchema);

module.exports = { profilePic };
