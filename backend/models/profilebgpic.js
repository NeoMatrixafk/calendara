const mongoose = require("mongoose");


//schema for profile background picture
const profileSchema = new mongoose.Schema({
    email: { type: String },
    bgimageData: { type: String },
});

const Profilebgpic = mongoose.model("Profilebgpic", profileSchema);

module.exports = { Profilebgpic };
