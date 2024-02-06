const mongoose = require("mongoose");

module.exports = () => {

	try {
		mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ezwqdmx.mongodb.net/calendara?retryWrites=true&w=majority`);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
	
};
