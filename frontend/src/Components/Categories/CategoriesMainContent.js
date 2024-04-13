import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesMainContent = (props) => {
    const selectedColor = localStorage.getItem("selectedColor") || "#ffeb3b";
    const email = localStorage.getItem("email");

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                let url = `http://localhost:55555/api/categories/${email}?`;
                if (selectedColor) {
                    const encodedColor = encodeURIComponent(selectedColor);
                    url += `color=${encodedColor}&`;
                }
                if (status) {
                    url += `status=${status}`;
                }
                const response = await axios.get(url);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }
        fetchEvents();
    }, [selectedColor, status, email]);
    
    

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
                            <h4>Title: {event.title}</h4>
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
