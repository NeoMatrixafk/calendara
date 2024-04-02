const router = require("express").Router();
const { User } = require("../models/user");


//getting username and contact number from server to client
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
    const userName = user.name;
    const userContact = user.contact;

    return res.status(200).json({ name: userName, contact: userContact });
});


module.exports = router;
