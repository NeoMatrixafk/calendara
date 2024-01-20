const mongoose = require('mongoose');



const profileSchema = new mongoose.Schema({

    admin: {type: String},
    imageData: {type: Buffer}

});

const profilepic = mongoose.model("profilepic", profileSchema);

module.exports = { profilepic };

