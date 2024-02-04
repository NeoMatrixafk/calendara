const mongoose = require("mongoose");

module.exports = () => {
<<<<<<< HEAD
    try {
        mongoose.connect(process.env.DB);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error);
        console.log("Could not connect database!");
    }
};
=======

	try {
		mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ezwqdmx.mongodb.net/calendara?retryWrites=true&w=majority`);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
	
};
>>>>>>> 868f64b1cca1996c5657c3481f3f61b1c6de6a11
