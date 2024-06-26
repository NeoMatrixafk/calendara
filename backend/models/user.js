const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


//schema for account details
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    reminder: { type: Boolean, default: true}
});

//creating jwt token for authentication
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "12h",
    });
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        contact: Joi.string().required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required().label("password"),
    });
    return schema.validate(data);
};


module.exports = { User, validate };

