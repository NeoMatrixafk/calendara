const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const axios = require("axios");



const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587, // Use port 587 instead of 465 for gmail
    secure: false, // Set to false for port 587 and true for 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const mailOptions = {
    from: {
        name: "calendara Support",
        address: process.env.EMAIL_USER,
    },
    to: [process.env.TEST_EMAIL],
    subject: "calendara Dummy Trial Email",
    text: `Hello User this is a reminder about your event`,
    html: `<b>Hello User</b> this is reminder about your event xyz`,
    attachments: [
        {
            filename: "hello.txt",
            path: path.join(__dirname, "hello.txt"),
        },
    ],
};

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent");
    } catch (error) {
        console.error(error);
    }
};

sendMail(transporter, mailOptions);
