const router = require("express").Router();
const Event = require("../models/event_");
const handleError = require("../utils/eventErrors");



router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const color = req.query.color;
    const status = req.query.status;
    let query = { admin: email };

    if (color && status) {
        query = { ...query, color, status };
    } else if (color) {
        query.color = color;
    } else if (status) {
        query.status = status;
    }

    const events = await Event.find(query);
    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});
module.exports = router;


module.exports = router;
