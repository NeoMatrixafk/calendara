import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesMainContent = (props) => {

    const selectedColor = localStorage.getItem("selectedColor") || "#ffeb3b";
    
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            
            try {
                // Encode the selectedColor value to ensure it's properly formatted for URL
                const encodedColor = encodeURIComponent(selectedColor);
                const response = await axios.get(
                    `http://localhost:55555/api/categories/${encodedColor}`
                );
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchEvents();
    }, [selectedColor]);

    return (
        <>
            <div
            className={`container my-5 text-${
                props.mode === "light" ? "black" : "white"
            }`}
        >
            <h1>Events</h1>
            <div className="container my-5">
                <h3>Category</h3>
                {events.map((event) => (
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
        </>
    );
};

export default CategoriesMainContent;
