const router = require("express").Router();
const Event = require("../models/event_");
const handleError = require("../utils/eventErrors");


router.get("/", async (req, res) => {
    const events = await Event.find({ reminder: true });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});


module.exports = router;
