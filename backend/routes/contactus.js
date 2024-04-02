const router = require("express").Router();
const { Contactus } = require("../models/contactUs");


//posting contactus form from client to server
router.post("/", async (req, res) => {
    const successMessage = "User created successfully";

    try {
        await new Contactus({ ...req.body }).save();
        res.status(201).json({ message: successMessage });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;
