const router = require("express").Router();
const { Forgotpassword } = require("../models/forgotPassword");

// Posting the forgot password request from the client to the server
router.post("/", async (req, res) => {
    const { email } = req.body;
    try {
        await new Forgotpassword({ email }).save();
        res.status(201).json({ message: "Request Sent Successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
