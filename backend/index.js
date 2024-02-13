//creating express app
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//importing database
const connection = require("./db");

//importing routes
const UserRoutes = require("./routes/Users");
const AuthRoutes = require("./routes/Auth");
const EventRoute = require("./routes/EventRoute");
const GetData = require("./routes/GetData");
const UpdateData = require("./routes/UpdateData");
const ContactUs = require("./routes/ContactUs");
const ProfilePic = require("./routes/ProfilePic");
const ProfileBgPic = require("./routes/ProfileBgPic");
const UploadCSV = require("./routes/UploadCSV");
const UploadXLSX = require("./routes/UploadXLSX");
const sendMail = require("./routes/sendMail");
const Reminders = require("./routes/Reminders");
const Categories = require("./routes/Categories");

// connecting database
connection();

// express app settings
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// creating routes
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/events", EventRoute);
app.use("/api/getData", GetData);
app.use("/api/updatedata", UpdateData);
app.use("/api/contactus", ContactUs);
app.use("/api/profilepic", ProfilePic);
app.use("/api/profilebgpic", ProfileBgPic);
app.use("/api/uploadcsv", UploadCSV);
app.use("/api/sendMail", sendMail);
app.use("/api/uploadxlsx", UploadXLSX);
app.use("/api/reminders", Reminders);
app.use("/api/categories", Categories);

//starting app
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
