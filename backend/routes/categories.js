const router = require("express").Router();
const Event = require("../models/event_");
const handleError = require("../utils/eventErrors");


//getting events based on selected category color
router.get("/:email/:selectedColor", async (req, res) => {

    const email = req.params.email;
    const color = req.params.selectedColor;
    const events = await Event.find({ admin: email, color: color });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});


module.exports = router;