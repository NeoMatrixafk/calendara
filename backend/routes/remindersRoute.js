const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors");



router.get("/:userName", async (req, res) => {

    const name = req.params.userName;

    try {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date 3 days from now
        const threeDaysAway = new Date();
        threeDaysAway.setDate(currentDate.getDate() + 3);

        // Find events for the given userName that are within 3 days from now
        const events = await Event.find({
            admin: name,
            start: {
                $gte: currentDate, // Start date is greater than or equal to current date
                $lte: threeDaysAway, // Start date is less than or equal to 3 days from now
            },
        });

        res.status(200).json(events);
        
    } catch (err) {

        handleError(err, res);

    }
});


module.exports = router;




