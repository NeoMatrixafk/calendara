const router = require("express").Router();
const Event = require("../models/event");
const handleError = require("../utils/eventErrors");



router.get("/upcoming/:userName", async (req, res) => {
    const name = req.params.userName;

    try {
        const currentDate = new Date();
        
        // Find events for the given userName that occur after the current date and time
        const events = await Event.find({
            admin: name,
            start: { $gte: currentDate },
        });

        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});


router.get("/7days/:userName", async (req, res) => {

    const name = req.params.userName;

    try {
        // Calculate the start of the date three days from now (midnight)
        const sevenDaysLaterStart = new Date();

        // Calculate the end of the date three days from now (end of day)
        const sevenDaysLaterEnd = new Date();
        sevenDaysLaterEnd.setDate(sevenDaysLaterEnd.getDate() + 7);

        // Find events for the given userName that occur on the date three days from now
        const events = await Event.find({
            admin: name,
            start: { $gte: sevenDaysLaterStart, $lte: sevenDaysLaterEnd },
        });

        res.status(200).json(events);

    } catch (err) {

        handleError(err, res);

    }
});

router.get("/3days/:userName", async (req, res) => {

    const name = req.params.userName;

    try {
        // Calculate the start of the date three days from now (midnight)
        const threeDaysLaterStart = new Date();

        // Calculate the end of the date three days from now (end of day)
        const threeDaysLaterEnd = new Date();
        threeDaysLaterEnd.setDate(threeDaysLaterEnd.getDate() + 3);

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

        // Calculate the end of the date three days from now (end of day)
        const oneDayLaterEnd = new Date();
        oneDayLaterEnd.setDate(oneDayLaterEnd.getDate() + 1);

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




