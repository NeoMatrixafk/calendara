const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors");



router.get("/3days/:userName", async (req, res) => {

    const name = req.params.userName;

    try {
        // Calculate the start of the date three days from now (midnight)
        const threeDaysLaterStart = new Date();
        threeDaysLaterStart.setDate(threeDaysLaterStart.getDate() + 3);
        threeDaysLaterStart.setHours(0, 0, 0, 0);

        // Calculate the end of the date three days from now (end of day)
        const threeDaysLaterEnd = new Date(threeDaysLaterStart);
        threeDaysLaterEnd.setHours(23, 59, 59, 999);

        // Find events for the given userName that occur on the date three days from now
        const events = await Event.find({
            admin: name,
            start: { $gte: threeDaysLaterStart, $lte: threeDaysLaterEnd },
        });

        res.status(200).json(events);

    } catch (err) {

        handleError(err, res);

    }
});

router.get("/1day/:userName", async (req, res) => {

    const name = req.params.userName;

    try {
        // Calculate the start of the date three days from now (midnight)
        const oneDayLaterStart = new Date();
        oneDayLaterStart.setDate(oneDayLaterStart.getDate() + 1);
        oneDayLaterStart.setHours(0, 0, 0, 0);

        // Calculate the end of the date three days from now (end of day)
        const oneDayLaterEnd = new Date(oneDayLaterStart);
        oneDayLaterEnd.setHours(23, 59, 59, 999);

        // Find events for the given userName that occur on the date three days from now
        const events = await Event.find({
            admin: name,
            start: { $gte: oneDayLaterStart, $lte: oneDayLaterEnd },
        });

        res.status(200).json(events);

    } catch (err) {

        handleError(err, res);

    }
});


module.exports = router;




