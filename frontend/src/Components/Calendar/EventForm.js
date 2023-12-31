import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const EventForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");

    const handleAddEvent = () => {
        const newEvent = {
            start: startDate,
            end: startDate, // For simplicity, using the same date as the end date
            title: name,
            category,
            priority,
        };

        props.onAddEvent(newEvent);

        // Clear the form
        setStartDate(new Date());
        setName("");
        setCategory("");
        setPriority("");
    };

    const formattedDate = moment(startDate).format("DD/MM/YYYY hh:mm A");

    return (
        <div>
            <h2
                className={`text-${props.mode === "light" ? "black" : "white"}`}
            >
                Add Event
            </h2>
            <form>
                <div className="mt-5 mb-3">
                    <label
                        className={`form-label text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Date and Time:
                    </label>
                    <DatePicker
                        selected={startDate}
                        className="ms-2 p-2 rounded-1 border-1"
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect // Enables time selection
                        timeFormat="hh:mm aa"
                    />
                </div>
                {/* Display the formatted date with time */}
                <p
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Selected Date: {formattedDate}
                </p>
                {/* ... (additional form fields) */}
                <div className="mb-3 mt-5">
                    <label
                        className={`form-label text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        className={`form-control text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                        style={{
                            backgroundColor:
                                props.mode === "dark" ? "#666B74" : "",
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        className={`form-label text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Category:
                    </label>
                    <input
                        type="text"
                        className={`form-control text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                        style={{
                            backgroundColor:
                                props.mode === "dark" ? "#666B74" : "",
                        }}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        className={`form-label text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Priority:
                    </label>
                    <input
                        type="text"
                        className={`form-control text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                        style={{
                            backgroundColor:
                                props.mode === "dark" ? "#666B74" : "",
                        }}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className={`btn btn-lg btn-${
                            props.mode === "light" ? "primary" : "danger"
                        } mt-3 rounded-pill`}
                        onClick={handleAddEvent}
                    >
                        Add Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
