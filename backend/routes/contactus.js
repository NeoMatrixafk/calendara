const router = require("express").Router();
const { contactus } = require("../models/contactus");

router.post("/", async (req, res) => {
    const successMessage = "User created successfully";

    try {
        await new contactus({ ...req.body }).save();
        res.status(201).json({ message: successMessage });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
