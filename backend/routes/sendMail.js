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
    try {
        console.log(req.body);
        const { recipient, eventTitles1Day } = req.body;

        console.log("Received data:", { recipient, eventTitles1Day });

        if (Array.isArray(eventTitles1Day)) {
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
                            .container {
                                display: block; /* Change to block */
                                margin: 0 auto; /* Center horizontally */
                                text-align: center; /* Center text within the container */
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
                                        ${eventTitles1Day}
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
            console.log("Email Content:", mailOptions.html);

            await transporter.sendMail(mailOptions);
            console.log("Email has been sent");
            res.status(200).send("Email sent successfully");
        } else {
            console.error("eventTitles1Day is not an array");
            res.status(400).send(
                "Bad Request: eventTitles1Day is not an array"
            );
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email");
    }
});

module.exports = router;
