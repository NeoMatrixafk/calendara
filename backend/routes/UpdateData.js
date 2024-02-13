const router = require("express").Router();
const { User } = require("../models/User");



// PUT request to update user contact
router.put("/updateusercontact/:userContact", async (req, res) => {
    const userContact = req.params.userContact;
    const newUserContact = req.body.newUserContact;

    try {
        // Find the user by email
        let user = await User.findOne({ contact: userContact });

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Update the user's email
        user.contact = newUserContact;
        console.log(user.contact);

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: "User Name updated successfully" });
    } catch (error) {
        console.error("Error updating user email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
