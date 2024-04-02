const mongoose = require("mongoose");


//schema for profile picture
const profileSchema = new mongoose.Schema({
    email: { type: String },
    imageData: { type: String },
});

const Profilepic = mongoose.model("Profilepic", profileSchema);


module.exports = { Profilepic };
