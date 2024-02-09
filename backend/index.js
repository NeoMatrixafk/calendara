require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const eventRoute = require("./routes/eventRoute");
const getData = require("./routes/getData");
const contactUs = require("./routes/contactus");
const profilepic = require("./routes/profilepic");
const profilebgpic = require("./routes/profilebgpic");
const uploadCSV = require("./routes/uploadCSV");
const uploadXLSX = require("./routes/uploadXLSX");
const sendMail = require("./routes/sendMail");
const reminders = require("./routes/remindersRoute");
const categories = require("./routes/categories");

// database connection
connection();

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoute);
app.use("/api/getData", getData);
app.use("/api/contactus", contactUs);
app.use("/api/profilepic", profilepic);
app.use("/api/profilebgpic", profilebgpic);
app.use("/api/uploadCSV", uploadCSV);
app.use("/api/sendMail", sendMail);
app.use("/api/uploadXLSX", uploadXLSX);
app.use("/api/reminders", reminders);
app.use("/api/categories", categories);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
