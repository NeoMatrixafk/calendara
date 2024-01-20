const router = require("express").Router();
const { profilepic } = require("../models/profilepic")



// Express route for handling file upload
router.post("/", async (req, res) => {
  try {

    await new profilepic({ ...req.body }).save();
    res.status(201).send({ success: true, message: 'Image uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error.' });
  }
});

module.exports = router;