const mongoose = require('mongoose');



const profileSchema = new mongoose.Schema({

    email: {type: String},
    imageData: {type: String}

});

const profilepic = mongoose.model("profilepic", profileSchema);

module.exports = { profilepic };

