const router = require("express").Router();
const { User } = require("../models/user");

router.get("/:email", async (req, res) => {
    const userEmail = req.params.email;
    let user;
    try {
        user = await User.findOne({ email: userEmail }, "-password");
    } catch (err) {
        return new Error(err);
    }
    if (!user) {
        return res.status(404).json({ messsage: "User Not Found" });
    }
    const userName = user.name; // Save the user's name as a variable
    const userContact = user.contact; // Save the user's contact as a variable

    return res.status(200).json({ name: userName, contact: userContact }); // Return only the user's name
});

module.exports = router;
