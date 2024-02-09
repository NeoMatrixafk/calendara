const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors");

router.get("/:color", async (req, res) => {

    const color = req.params.color;
    const events = await Event.find({ color: color });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});


module.exports = router;