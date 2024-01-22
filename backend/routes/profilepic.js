const router = require("express").Router();
const { profilepic } = require("../models/profilepic")



router.post("/", async (req, res) => {

  try {

    await new profilepic({ ...req.body }).save();
    res.status(201).send({ success: true, message: 'Image uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error.' });
  }

});

router.get("/:email", async (req, res) => {

  const email = req.params.email;

  try {
      const imageBody = await profilepic.findOne({ email: email });
      if (!imageBody) {
        console.log(`No document found for email: ${email}. Nothing to get.`);
        res.status(200).json("No document found. Nothing to get.");
        return;
    }
      res.status(200).json(imageBody);
  } catch (err) {
      handleError(err, res);
  }
});

router.delete("/:email", async (req, res) => {

  const email = req.params.email;
    
    try {
        const imageBody = await profilepic.findOne({ email: email });

        if (!imageBody) {
            console.log(`No document found for email: ${email}. Nothing to delete.`);
            res.status(200).json("No document found. Nothing to delete.");
            return;
        }

        await imageBody.deleteOne();
        res.status(200).json("Image has been deleted");
    } catch (err) {
      handleError(err, res);
  }
});


module.exports = router;