import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpcomingEvents = (props) => {
    //Hooks
    const navigate = useNavigate();

    const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);
    const [totalEventsCount, setTotalEventsCount] = useState(0);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchUpcomingEventsData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/events/resolved/upcoming/${email}`
                );
                const events = response.data;
                setUpcomingEventsCount(events.length);
                setUpcomingEvents(events);
            } catch (error) {
                console.error(
                    "Error fetching length of upcoming events:",
                    error
                );
            }
        };

        fetchUpcomingEventsData();
    }, [email]);

    useEffect(() => {
        const fetchTotalEventsData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/events/${email}`
                );
                const events = response.data;
                setTotalEventsCount(events.length);
            } catch (error) {
                console.error("Error fetching length of total events:", error);
            }
        };

        fetchTotalEventsData();
    }, [email]);

    const handlePieClick = () => {
        setModalShow(true); // Open the modal when pie chart is clicked
    };

    const handleEventClick = (eventId) => {
        const clickedEvent = upcomingEvents.find(
            (event) => event._id === eventId
        );
        navigate(`/event/${eventId}/update`, {
            state: { selectedEvent: clickedEvent, selectedEventId: eventId },
        });
        setModalShow(false);
    };

    const data = [
        { name: "Upcoming Events", value: upcomingEventsCount },
        { name: "Total Events", value: totalEventsCount },
    ];

    const totalEventsColor = props.mode === "light" ? "#e6e6e6" : "#474b52";

    const COLORS = ["#ffc107", totalEventsColor];

    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: "#ffc107",
                                color: "black",
                                height: "4rem",
                                width: "4rem",
                                borderRadius: "2rem",
                            }}
                        >
                            <i className="bi bi-clock"></i>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <p
                            className={`p-0 dashboard-chart-heading text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            To be Resolved - Upcoming
                        </p>
                    </div>
                    <div className="">
                        <PieChart width={300} height={400}>
                            <Pie
                                dataKey="value"
                                data={data}
                                cx={151.5}
                                cy={200}
                                innerRadius={40}
                                outerRadius={80}
                                fill="#82ca9d"
                                onClick={handlePieClick}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div className="col-12 p-0">
                        <div className="col-12 d-flex ps-5 mb-1">
                            <div
                                style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    backgroundColor: "#daa520",
                                }}
                            ></div>
                            <div className="ms-2">
                                <p
                                    className={`m-0 text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                >
                                    : Upcoming events
                                </p>
                            </div>
                        </div>
                        <div className="col-12 d-flex ps-5 my-3">
                            <div
                                style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    backgroundColor: "#82ca9d",
                                }}
                            ></div>
                            <div className="ms-2">
                                <p
                                    className={`m-0 text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                >
                                    : Total Events
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                className="mt-5"
            >
                <Modal.Header
                    closeVariant={props.mode === "dark" ? "white" : "black"}
                    closeButton
                    className={props.mode === "light" ? "" : "border-secondary"}
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "white" : "#36393e",
                    }}
                >
                    <Modal.Title
                        style={{
                            WebkitTextFillColor:
                                props.mode === "light" ? "" : "white",
                        }}
                    >
                        Upcoming Events
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "white" : "#36393e",
                        height: "25rem",
                        overflowY: "auto",
                    }}
                >
                    <ul>
                        {upcomingEvents.map((event, index) => (
                            <div
                                key={event._id}
                                className={`my-3 text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                onClick={() => handleEventClick(event._id)}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className="me-2"
                                        style={{
                                            width: "1.25rem",
                                            height: "1.25rem",
                                            borderRadius: "50%",
                                            backgroundColor: event.color,
                                        }}
                                    ></div>
                                    <h3 className="my-0">{event.title}</h3>
                                </div>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {event.describe}
                                </p>
                                <p>
                                    <strong>Start:</strong>{" "}
                                    {new Date(event.start).toLocaleString()}
                                </p>
                                <p>
                                    <strong>End:</strong>{" "}
                                    {new Date(event.end).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Status:</strong> {event.status}
                                </p>
                                {index !== upcomingEvents.length - 1 && (
                                    <hr className="border-bottom" />
                                )}
                            </div>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "white" : "#36393e",
                    }}
                    className={`border-${
                        props.mode === "light" ? "" : "secondary"
                    }`}
                >
                    <p
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        calendara
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpcomingEvents;
