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
        setSelectedColor(colorValue);
    };

    return (
        <>
            {/* SIDEBAR */}
            <div className="categories d-flex my-5">
                <div className="categories-side">
                    <div className="container">
                        <div className="container p-0">
                            <h1
                                className={`mb-2 d-flex justify-content-center text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                            >
                                Categories
                            </h1>
                        </div>
                        <div className="row d-flex justify-content-center mt-3 mb-5">
                            {categoryColors.map((colorValue, index) => {
                                if (colorValue !== 0) {
                                    return (
                                        <button
                                            key={index}
                                            className="btn w-75 my-2 mx-5"
                                            style={{
                                                backgroundColor: colorValue,
                                                color:
                                                    props.mode === "light"
                                                        ? "black"
                                                        : "white",
                                                height: "2.5rem",
                                            }}
                                        >
                                            <div className="form-check d-flex justify-content-center align-items-center">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={
                                                        selectedColor ===
                                                        colorValue
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxClick(
                                                            colorValue
                                                        )
                                                    }
                                                />
                                            </div>
                                        </button>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div
                    className={`container mb-5 ms-3 text-${
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
                                <p>
                                    <strong>Start:</strong>{" "}
                                    {new Date(event.start).toLocaleString()}
                                </p>
                                <p>
                                    <strong>End:</strong>{" "}
                                    {new Date(event.end).toLocaleString()}
                                </p>
                                <p>
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
