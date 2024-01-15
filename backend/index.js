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
app.use("/api/contactus", contactUs)

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
