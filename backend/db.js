const mongoose = require("mongoose");


//connecting to online mongodb atlas database
//getting mongodb account username and password from .env file
module.exports = () => {
    try {
        mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ezwqdmx.mongodb.net/calendara?retryWrites=true&w=majority`
        );
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error);
        console.log("Could not connect database!");
    }
};
