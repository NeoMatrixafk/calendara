import React, { useState, useEffect } from "react";
import axios from "axios";

const Reminders = (props) => {
    const [events7days, setEvents7days] = useState([]);
    const [events3days, setEvents3days] = useState([]);
    const [events1day, setEvents1day] = useState([]);
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        async function fetch7daysEvents() {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/reminders/7days/${userName}`
                );
                setEvents7days(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetch7daysEvents();
    }, [userName]);

    useEffect(() => {
        async function fetch3daysEvents() {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/reminders/3days/${userName}`
                );
                setEvents3days(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetch3daysEvents();
    }, [userName]);

    useEffect(() => {
        async function fetch1dayEvents() {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/reminders/1day/${userName}`
                );
                setEvents1day(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetch1dayEvents();
    }, [userName]);

    return (
        <div
            className={`container my-5 text-${
                props.mode === "light" ? "black" : "white"
            }`}
        >
            <h1>Reminders</h1>
            <div className="container my-5">
                <h3>Within 7 Days</h3>
                {events7days.map((event) => (
                    <li key={event._id}>
                        <h2>{event.title}</h2>
                        <p>
                            <strong>Start:</strong>{" "}
                            {new Date(event.start).toLocaleString()}
                        </p>
                        <p>
                            <strong>End:</strong>{" "}
                            {new Date(event.end).toLocaleString()}
                        </p>
                        <p>
                            <strong>Description:</strong> {event.describe}
                        </p>
                    </li>
                ))}
            </div>
            <div className="container my-5">
                <h3>Within 3 Days</h3>
                {events3days.map((event) => (
                    <li key={event._id}>
                        <h2>{event.title}</h2>
                        <p>
                            <strong>Start:</strong>{" "}
                            {new Date(event.start).toLocaleString()}
                        </p>
                        <p>
                            <strong>End:</strong>{" "}
                            {new Date(event.end).toLocaleString()}
                        </p>
                        <p>
                            <strong>Description:</strong> {event.describe}
                        </p>
                    </li>
                ))}
            </div>
            <div className="container my-5">
                <h3>Within 1 Day</h3>
                {events1day.map((event) => (
                    <li key={event._id}>
                        <h2>{event.title}</h2>
                        <p>
                            <strong>Start:</strong>{" "}
                            {new Date(event.start).toLocaleString()}
                        </p>
                        <p>
                            <strong>End:</strong>{" "}
                            {new Date(event.end).toLocaleString()}
                        </p>
                        <p>
                            <strong>Description:</strong> {event.describe}
                        </p>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default Reminders;
