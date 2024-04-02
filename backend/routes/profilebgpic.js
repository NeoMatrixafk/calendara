const router = require("express").Router();
const { Profilebgpic } = require("../models/profileBgPic");


//posting background picture from client to server
router.post("/", async (req, res) => {
    try {
        await new Profilebgpic({ ...req.body }).save();
        res.status(201).send({
            success: true,
            message: "Image uploaded successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error.",
        });
    }
});

//getting background picture from server to client according to email
router.get("/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const bgimageBody = await Profilebgpic.findOne({ email: email });
        if (!bgimageBody) {
            console.log(
                `No document found for email: ${email}. Nothing to get.`
            );
            res.status(200).json("No document found. Nothing to get.");
            return;
        }
        res.status(200).json(bgimageBody);
    } catch (err) {
        handleError(err, res);
    }
});

//deleting background picture from server according to email
router.delete("/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const bgimageBody = await Profilebgpic.findOne({ email: email });

        if (!bgimageBody) {
            console.log(
                `No document found for email: ${email}. Nothing to delete.`
            );
            res.status(200).json("No document found. Nothing to delete.");
            return;
        }

        await bgimageBody.deleteOne();
        res.status(200).json("Image has been deleted");
    } catch (err) {
        handleError(err, res);
    }
});


module.exports = router;
