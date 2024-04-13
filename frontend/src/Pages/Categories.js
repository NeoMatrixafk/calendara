import React, { useState, useEffect } from "react";
import axios from "axios";

import categoryColors from "../Components/Categories/categoryColors";

const Categories = (props) => {
    const [selectedColor, setSelectedColor] = useState(
        localStorage.getItem("selectedColor") || "#ffeb3b"
    );

    localStorage.setItem("selectedColor", selectedColor);

    const email = localStorage.getItem("email");

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const encodedColor = encodeURIComponent(selectedColor);
                const response = await axios.get(
                    `http://localhost:55555/api/categories/${email}/${encodedColor}`
                );
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchEvents();
    }, [selectedColor, email]);

    const handleCheckboxClick = (colorValue) => {
        setSelectedColor((prevColor) =>
            prevColor === colorValue ? null : colorValue
        );
    };

    const [status, setStatus] = useState("overdue");

    return (
        <>
            <div
                className={`container my-5 text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <h3 className="d-flex justify-content-center">
                                        By Colors
                                    </h3>
                                    <div className="">
                                        {categoryColors.map(
                                            (colorValue, index) => {
                                                if (colorValue !== 0) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="mb-3 d-flex justify-content-center"
                                                        >
                                                            <button
                                                                className="btn w-75"
                                                                style={{
                                                                    backgroundColor:
                                                                        colorValue,
                                                                    color:
                                                                        props.mode ===
                                                                        "light"
                                                                            ? "black"
                                                                            : "white",
                                                                    height: "2.5rem",
                                                                    fontSize:
                                                                        "0.8rem",
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
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h3 className="d-flex justify-content-center">
                                        By Status
                                    </h3>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Status:
                                        </label>
                                        <div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="completed"
                                                    name="status"
                                                    value="Completed"
                                                    checked={
                                                        status === "Completed"
                                                    }
                                                    onChange={(e) =>
                                                        setStatus(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="completed"
                                                    className="form-label ms-2 me-4"
                                                >
                                                    Completed
                                                </label>
                                            </div>

                                            <div>
                                                <input
                                                    type="radio"
                                                    id="overdue"
                                                    name="status"
                                                    value="Overdue"
                                                    checked={
                                                        status === "Overdue"
                                                    }
                                                    onChange={(e) =>
                                                        setStatus(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="overdue"
                                                    className="form-label ms-2 me-4"
                                                >
                                                    Overdue
                                                </label>
                                            </div>

                                            <div>
                                                <input
                                                    type="radio"
                                                    id="upcoming"
                                                    name="status"
                                                    value="Upcoming"
                                                    checked={
                                                        status === "Upcoming"
                                                    }
                                                    onChange={(e) =>
                                                        setStatus(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="upcoming"
                                                    className="form-label ms-2 me-4"
                                                >
                                                    Upcoming
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="">
                            <h3 className="d-flex justify-content-center">
                                Events
                            </h3>
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
            </div>
        </>
    );
};

export default Categories;
