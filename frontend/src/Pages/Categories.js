import React, { useState, useEffect } from "react";
import axios from "axios";

import categoryColors from "../Components/Categories/categoryColors";

const Categories = (props) => {
    const [selectedColor, setSelectedColor] = useState(
        localStorage.getItem("selectedColor") || "#ffeb3b"
    );

    localStorage.setItem("selectedColor", selectedColor);

    const userName = localStorage.getItem("userName");

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
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

    const handleCheckboxClick = (colorValue) => {
        setSelectedColor((prevColor) =>
            prevColor === colorValue ? null : colorValue
        );
    };

    return (
        <>
            {/* SIDEBAR */}
            <div className="categories d-flex my-5">
                <div className="categories-side">
                    <div className="container">
                        <h1
                            className={`mb-3 text-center text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            Categories
                        </h1>
                        <div className="row justify-content-center">
                            {categoryColors.map((colorValue, index) => {
                                if (colorValue !== 0) {
                                    return (
                                        <div
                                            key={index}
                                            className="col-12 mb-3"
                                        >
                                            <button
                                                className="btn w-100"
                                                style={{
                                                    backgroundColor: colorValue,
                                                    color:
                                                        props.mode === "light"
                                                            ? "black"
                                                            : "white",
                                                    height: "2.5rem",
                                                    fontSize: "0.8rem",
                                                }}
                                                onClick={() =>
                                                    handleCheckboxClick(
                                                        colorValue
                                                    )
                                                }
                                            >
                                                <div className="form-check d-flex justify-content-center align-items-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={
                                                            selectedColor ===
                                                            colorValue
                                                        }
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div
                    className={`container mb-5 ms-1 text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    <h1>Events</h1>
                    <div className="container my-5">
                        {events.map((event) => (
                            <li
                                key={event._id}
                                style={{ listStyleType: "none" }}
                            >
                                <h4>Title: {event.title}</h4>
                                <p className="event-text">
                                    <strong>Start:</strong>{" "}
                                    {new Date(event.start).toLocaleString()}
                                </p>
                                <p className="event-text">
                                    <strong>End:</strong>{" "}
                                    {new Date(event.end).toLocaleString()}
                                </p>
                                <p className="event-text">
                                    <strong>Description:</strong>{" "}
                                    {event.describe}
                                </p>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
