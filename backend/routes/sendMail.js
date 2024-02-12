const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

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
    const { recipient, eventTitles1Day } = req.body;

    const mailOptions = {
        from: {
            name: "calendara Support",
            address: process.env.EMAIL_USER,
        },
        to: [recipient],
        subject: "Calendara Reminder Email",
        html: `
            <html>
                <head>
                    <style>
                        p { font-size: 18px; }
                        ul { list-style-type: none; padding: 0; }
                        li { margin-bottom: 8px; }
                        a { display: inline-block; padding: 10px; background-color: #edc9af; color: #ffffff; text-decoration: none; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <img src="https://github.com/ayush-sharma11/calendara/blob/master/frontend/public/Images/Logo/calendara_light.png?raw=true" alt="Calendara Logo">
                    <p>Hello User,</p>
                    <p>This is a reminder about your upcoming events:</p>
                    <ul>
                    ${
                        Array.isArray(eventTitles1Day)
                            ? eventTitles1Day
                                  .map((title) => `<li>${title}</li>`)
                                  .join("")
                            : ""
                    }
        </ul>
                    <a href="https://calendara-65xh.onrender.com/#/events">View Your Events</a>
                    <p>Thank you for using calendara!</p>
                </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent");
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email");
    }
});

module.exports = router;
