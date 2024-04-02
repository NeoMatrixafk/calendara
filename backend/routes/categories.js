const router = require("express").Router();
const Event = require("../models/event");
const handleError = require("../utils/eventErrors");


//getting events based on selected category color
router.get("/:userName/:selectedColor", async (req, res) => {

    const userName = req.params.userName;
    const color = req.params.selectedColor;
    const events = await Event.find({ admin: userName, color: color });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});


module.exports = router;