const mongoose = require("mongoose");


//schema for contactus page
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const ContactUs = mongoose.model("ContactUs", userSchema);


module.exports = { ContactUs };
