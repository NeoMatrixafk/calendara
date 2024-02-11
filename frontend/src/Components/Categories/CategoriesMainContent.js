import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesMainContent = (props) => {
    const selectedColor = localStorage.getItem("selectedColor") || "#ffeb3b";
    const userName = localStorage.getItem("userName");

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            
            try {
                // Encode the selectedColor value to ensure it's properly formatted for  URL
                const encodedColor = encodeURIComponent(selectedColor);
                const response = await axios.get(
                    `http://localhost:55555/api/categories/${userName}/${encodedColor}`
                );
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchEvents();
    }, [selectedColor, userName]);

    return (
        <>
            <div
                className={`container mb-5 ms-3 text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                <h1>Events</h1>
                <div className="container my-5">
                    {events.map((event) => (
                        <li key={event._id} style={{ listStyleType: "none" }}>
                            <h2>Title: {event.title}</h2>
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
        </>
    );
};

export default CategoriesMainContent;
