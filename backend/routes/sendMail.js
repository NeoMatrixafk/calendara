const express = require("express");
// do not remove it. removing it is causing error
const nodemailer = require("nodemailer");
const router = require("express").Router();



const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

router.post("/", async (req, res) => {
    const { recipient } = req.body;

    const mailOptions = {
        from: {
            name: "calendara Support",
            address: process.env.EMAIL_USER,
        },
        to: [recipient] || "ayush03neo@gmail.com",
        subject: "calendara Reminder Email",
        text: `Hello User this is a reminder about your event ${"xyz"}`,
        html: `<b>Hello User</b> this is reminder about your event ${"xyz"}`,
    };

    try {
        transporter.sendMail(mailOptions);
        console.log("Email has been sent");
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email");
    }
});

module.exports = router;
