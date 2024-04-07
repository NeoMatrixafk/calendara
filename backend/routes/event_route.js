const router = require("express").Router();
const Event = require("../models/event_");
const handleError = require("../utils/eventErrors");


//getting events based on uploaded from server to client
router.get("/uploaded/:email", async (req, res) => {
    const email = req.params.email;
    const events = await Event.find({ admin: email, uploaded: true });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});

//getting events based on username from server to client
router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const events = await Event.find({ admin: email });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});

//getting events based on id from server to client
router.get("/:id/show", async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);

    try {
        res.status(200).json(event);
    } catch (err) {
        handleError(err, res);
    }
});

//getting events based on status: unresolved
router.get("/unresolved/:email", async (req, res) => {
    const email = req.params.email;
    const events = await Event.find({ admin: email, status: "Unresolved" });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});

//getting events based on status: completed, upcoming, overdue
router.get("/resolved/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const events = await Event.find({ admin: email, status: { $in: ["Completed", "Upcoming", "Overdue"] } });
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});

//getting events based on status: completed
router.get("/resolved/completed/:email", async (req, res) => {
    const email = req.params.email;
    const events = await Event.find({ admin: email, status: "Completed" });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});

//getting events based on status: upcoming
router.get("/resolved/upcoming/:email", async (req, res) => {
    const email = req.params.email;
    const events = await Event.find({ admin: email, status: "Upcoming" });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});

//getting events based on status: overdue
router.get("/resolved/overdue/:email", async (req, res) => {
    const email = req.params.email;
    const events = await Event.find({ admin: email, status: "Overdue" });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});


//posting events based from server to client
router.post("/", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (err) {
        handleError(err, res);
    }
});

//updating events based from client to server
router.put("/:id/update", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ _id: id });
        if (event) {
            Object.assign(event, req.body);
            const updatedEvent = await event.save();
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

//deleting events from client to server
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
