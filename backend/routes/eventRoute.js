const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors");

router.get("/:userName", async (req, res) => {
    const name = req.params.userName;
    const events = await Event.find({ admin: name });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});

router.get("/:id/show", async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);

    try {
        res.status(200).json(event);
    } catch (err) {
        handleError(err, res);
    }
});

router.post("/", async (req, res) => {
    
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (err) {
        handleError(err, res);
    }
});

router.put("/:id/update", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ _id: id });
        if (event) {
            Object.assign(event, req.body);
            const updatedEvent = await event.save(); // Use save without a callback
            res.status(200).json(updatedEvent);
        }
        if (!event) {
            res.status(404).json({ error: "event is not found" });
        }
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
});

router.delete("/:id/delete", async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById({ _id: id });
    try {
        await event.deleteOne();
        res.status(200).json("Event has been deleted");
    } catch (err) {
        handleError(err, res);
    }
});

module.exports = router;
