//creating express app
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//importing database
const connection = require("./db");

//importing routes
const UserRoutes = require("./routes/users");
const AuthRoutes = require("./routes/auth");
const EventRoute = require("./routes/eventRoute");
const GetData = require("./routes/getData");
const UpdateData = require("./routes/UpdateData");
const ContactUs = require("./routes/contactus");
const ProfilePic = require("./routes/profilePic");
const ProfileBgPic = require("./routes/profileBgPic");
const UploadCSV = require("./routes/uploadCSV");
const UploadXLSX = require("./routes/uploadXLSX");
const SendMail = require("./routes/sendMail");
const Reminders = require("./routes/Reminders");
const Categories = require("./routes/categories");
const ForgotPassword = require("./routes/forgotPassword");

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
app.use("/api/sendmail", SendMail);
app.use("/api/uploadxlsx", UploadXLSX);
app.use("/api/reminders", Reminders);
app.use("/api/categories", Categories);
app.use("/api/forgotpassword", ForgotPassword);

//starting app
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
