import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// these are the values and color of activity section in the dashboard
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Activity = (props) => {

    //Hooks
    const navigate = useNavigate();

    //States
    const [resolvedEventsCount, setResolvedEventsCount] = useState();
    localStorage.setItem("resolvedEventsCount", resolvedEventsCount);
    const [unresolvedEventsCount, setUnResolvedEventsCount] = useState();
    localStorage.setItem("unresolvedEventsCount", unresolvedEventsCount);
    const [unresolvedEvents, setUnresolvedEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const userName = localStorage.getItem("userName");

    //Handling functions
    useEffect(() => {
        const fetchTotalEventsData = async () => {
            try {
                const response = await axios.get(`http://localhost:55555/api/events/resolved/${userName}`);
                const events = response.data;
                setResolvedEventsCount(events.length);
            } catch (error) {
                console.error("Error fetching length of resolved events:", error);
            }
        };

        fetchTotalEventsData();
    }, [userName]);

    useEffect(() => {
        const fetchTotalEventsData = async () => {
            try {
                const response = await axios.get(`http://localhost:55555/api/events/unresolved/${userName}`);
                const events = response.data;
                setUnResolvedEventsCount(events.length);
                setUnresolvedEvents(events);
            } catch (error) {
                console.error("Error fetching length of unresolved events:", error);
            }
        };

        fetchTotalEventsData();
    }, [userName]);

    const handlePieClick = () => {
        setModalShow(true); // Open the modal when pie chart is clicked
    };

    const handleEventClick = (eventId) => {
        const clickedEvent = unresolvedEvents.find(
            (event) => event._id === eventId
        );
        navigate(`/event/${eventId}/update`, {
            state: { selectedEvent: clickedEvent, selectedEventId: eventId },
        });
        setModalShow(false);
    };

    const data = [
        { name: "Group A", value: resolvedEventsCount },
        { name: "Group B", value: unresolvedEventsCount },
    ];

    const COLORS = ["#00e600", "#ff0000"];

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: "#007bff",
                                color: "white",
                                height: "4rem",
                                width: "4rem",
                                borderRadius: "2rem",
                            }}
                        >
                            <i className="bi bi-activity"></i>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <p
                            className={`p-0 text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            Activity - Current Month
                        </p>
                    </div>
                    <div className="col-12 p-0">
                        <PieChart width={306} height={400}>
                            <Pie
                                data={data}
                                cx={153}
                                cy={200}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
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
                        <div className="col-12 d-flex ps-5 mb-1">
                            <div
                                style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    backgroundColor: "#00e600",
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
                                    : Resolved events
                                </p>
                            </div>
                        </div>
                        <div className="col-12 d-flex ps-5 my-3">
                            <div
                                style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    backgroundColor: "#ff0000",
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
                                    : Unresolved events
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="md"
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
                        Unresolved Events
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
                        {unresolvedEvents.map((event, index) => (
                            <div
                                key={event._id}
                                className={`my-3 text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                onClick={() => handleEventClick(event._id)}
                            >
                                <h3>{event.title}</h3>
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
                                {index !== unresolvedEvents.length - 1 && (
                                    <hr className="border-bottom" />
                                )}
                            </div>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "white" : "#36393e"
                    }}
                    className="border-secondary"
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

export default Activity;
