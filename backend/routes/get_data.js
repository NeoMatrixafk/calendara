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
    const reminder = user.reminder;

    return res.status(200).json({ name: userName, contact: userContact, reminder: reminder });
});

// PUT route to update the user's reminder status
router.put("/:email", async (req, res) => {
    const userEmail = req.params.email;
    const { reminder } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { email: userEmail },
        { reminder },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
  
      return res.status(200).json({ reminder: user.reminder });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating user's reminder status" });
    }
  });


module.exports = router;
