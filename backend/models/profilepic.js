const mongoose = require("mongoose");


//schema for profile picture
const profileSchema = new mongoose.Schema({
    email: { type: String },
    imageData: { type: String },
});

const profilepic = mongoose.model("profilepic", profileSchema);


module.exports = { profilepic };
