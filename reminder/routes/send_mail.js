const router = require("express").Router();
const nodemailer = require("nodemailer");
const axios = require("axios");


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

const eventTimeouts = new Map();

const sendReminderEmail = async (event, withinbeforeTime) => {
    try {
        console.log(`Sending email for event: ${event.title}`);
        const mailOptions = {
            from: {
                name: "calendara Support",
                address: process.env.EMAIL_USER,
            },
            to: `${event.admin}`,
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
                            <p>This is a reminder about your following upcoming events within ${withinbeforeTime}:</p>
                            <ul>
                                <b>${event.title}</b>
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
        eventTimeouts.delete(event._id);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

const checkAndSendReminders = async () => {
    try {   
        const eventsResponse = await axios.get(`http://localhost:54545/api/events`);

        if (eventsResponse.status === 200) {
            const eventsData = eventsResponse.data;

            const currentTime = new Date();
            for (const event of eventsData) {
                const withinbeforeTime = "1 hr";
                const beforeTime = 60 * 60 * 1000;
                const eventStartTime = new Date(event.start);
                const delay = eventStartTime.getTime() - currentTime.getTime() - beforeTime;
                if (delay > 0) {
                    if (!eventTimeouts.has(event._id)) {
                        eventTimeouts.set(event._id, setTimeout(async () => {
                            try {
                                await sendReminderEmail(event, withinbeforeTime);
                            } catch (error) {
                                console.error("Error sending reminder email:", error);
                            }
                        }, delay));
                    } else {
                        console.log(`Timeout already set for event ${event.title}`);
                    }
                } else {
                    console.log("Target time for event", event.title, "has already passed");
                }
            }
        } else {
            console.error('Error fetching events:', eventsResponse.status, eventsResponse.data);
        }
    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

router.get('/runReminders', async (req, res) => {
    try {
        await checkAndSendReminders();
        res.status(200).send('Reminders checked and sent successfully');
    } catch (error) {
        console.error('Error running reminders:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = {
    router,
    checkAndSendReminders
};