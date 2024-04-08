//creating express app
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//importing database
const connection = require("./db");

//importing routes
const UserRoutes = require("./routes/users");
const EventRoute = require("./routes/event_route");
const { router, checkAndSendReminders } = require('./routes/send_mail');

// connecting database
connection();

// express app settings
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// creating routes
app.use("/api/users", UserRoutes);
app.use("/api/events", EventRoute);
app.use(router);

// Start the server
const PORT = 54545 || 3000; // Adjusted this line to use the environment port if available
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Call the route to run reminders on server startup
app.get('/startReminders', async (req, res) => {
    try {
        await checkAndSendReminders();
        res.status(200).send('Reminders started successfully');
    } catch (error) {
        console.error('Error starting reminders:', error);
        res.status(500).send('Internal server error');
    }
});

// Run the checkAndSendReminders function every 1 sec
setInterval(async () => {
    try {
        await checkAndSendReminders();
    } catch (error) {
        console.error('Error running reminders:', error);
    }
}, 1000);
