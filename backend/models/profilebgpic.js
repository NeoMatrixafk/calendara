const mongoose = require("mongoose");


//schema for profile background picture
const profileSchema = new mongoose.Schema({
    email: { type: String },
    bgimageData: { type: String },
});

const profilebgpic = mongoose.model("profilebgpic", profileSchema);


module.exports = { profilebgpic };
