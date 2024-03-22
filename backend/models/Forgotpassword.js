const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const Forgotpassword = mongoose.model("Forgotpassword", forgotPasswordSchema);

module.exports = { Forgotpassword };
