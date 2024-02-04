const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    email: { type: String },
    bgimageData: { type: String },
});

const profilebgpic = mongoose.model("profilebgpic", profileSchema);

module.exports = { profilebgpic };
