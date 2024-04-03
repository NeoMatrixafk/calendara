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

const targetTime = new Date("2024-03-31T23:39:00");
const currentTime = new Date();
const delay = targetTime.getTime() - currentTime.getTime() - 5 * 60 * 1000;

const event = {
    title: "Your Event Title Here",
};

if (delay > 0) {
    setTimeout(async () => {
        try {
            const mailOptions = {
                from: {
                    name: "calendara Support",
                    address: process.env.EMAIL_USER,
                },
                to: [email],
                subject: "calendara Reminder Email",
                html: `
                <html>
                    <head>
                    <style>
                        .container {
                            display: block;
                            margin: 0 auto;
                            text-align: center;
                        }

                        p {
                            font-size: 18px;
                        }

                        ul {
                            list-style-type: none;
                            padding: 0;
                            font-size: 18px;
                        }

                        li {
                            margin-bottom: 8px;
                        }

                        a {
                            display: inline-block;
                            padding: 10px;
                            background-color: #edc9af;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                    </style>

                    </head>
                    <body>
                        <div class="container">
                            <img src="https://github.com/ayush-sharma11/calendara/blob/master/frontend/public/Images/Logo/calendara_light.png?raw=true" alt="Calendara Logo">
                            <p>Hello User,</p>
                            <p>This is a reminder about your following upcoming events within 24 hours:</p>
                            <ul>
                                <b>
                                    ${event.title}
                                </b>
                            </ul>
                            <p>Click on the link below to check your events in calendara</p>
                            <a href="https://calendara-65xh.onrender.com/#/events">View Your Events</a>
                            <p>Thank you for using calendara!</p>
                        </div>
                    </body>
                </html>
            `,
            };

            await transporter.sendMail(mailOptions);
            console.log("Email has been sent");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }, delay);
} else {
    console.log("Target time has already passed");
}

module.exports = router;
