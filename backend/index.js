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
const EventRoute = require("./routes/event_route");
const GetData = require("./routes/get_data");
const UpdateData = require("./routes/update_data");
const ContactUs = require("./routes/contact_us");
const ProfilePic = require("./routes/profile_pic");
const ProfileBgPic = require("./routes/profile_bg_pic");
const UploadCSV = require("./routes/upload_csv");
const UploadXLSX = require("./routes/upload_xlsx");
const Reminders = require("./routes/reminders_");
const Categories = require("./routes/categories");
const ForgotPassword = require("./routes/forgot_password");

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
app.use("/api/uploadxlsx", UploadXLSX);
app.use("/api/reminders", Reminders);
app.use("/api/categories", Categories);
app.use("/api/forgotpassword", ForgotPassword);

//starting app
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
