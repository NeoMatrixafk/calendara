const mongoose = require("mongoose");

//schema for profile background picture
const profileSchema = new mongoose.Schema({
    email: { type: String },
    bgimageData: { type: String },
});

const profileBgPic = mongoose.model("profileBgPic", profileSchema);

module.exports = { profileBgPic };
