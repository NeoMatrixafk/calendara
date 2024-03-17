import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import "../Calendar/calendar2.css";
import axios from "axios";
import moment from "moment";

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedColor, setSelectedColor] = useState("#3174ad"); // Default color
    const { register, handleSubmit } = useForm();
    const [modalMode, setModalMode] = useState(null);

    useEffect(() => {
        // Fetch events for the logged-in user
        fetchEvents();
    }, []); // Runs only once on component mount

    const fetchEvents = async () => {
        try {
            // Retrieve the username from local storage
            const userName = localStorage.getItem("userName");

            // Fetch events for the specific user from the backend
            const response = await axios.get(
                `http://localhost:55555/api/events/${userName}`
            );
            const convertedEvents = response.data.map((event) => ({
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end),
                id: event._id,
                describe: event.describe,
                color: event.color,
            }));

            // Set the fetched events to the state
            setEvents(convertedEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleDateSelect = (arg) => {
        const newEvent = {
            title: "No Title",
            start: arg.startStr,
            end: arg.endStr,
            allDay: arg.allDay,
        };

        setSelectedEvent({
            title: "No Title",
            start: arg.startStr,
            end: arg.endStr,
            describe: "",
            color: selectedColor, // Set the default color from ColorPalette
        });

        setModalMode("create");

        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    const handleEventClick = async (arg) => {
        try {
            const eventId = arg.event.id; // Assuming event id is available
            const response = await axios.get(
                `http://localhost:55555/api/events/${eventId}/show`
            );
            setSelectedEvent({
                ...response.data,
                start: moment(response.data.start).format("ddd DD MMM YY LT"),
                end: moment(response.data.end).format("ddd DD MMM YY LT"),
            });
            setModalMode("view");
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    };

    const handleDeleteEvent = async () => {
        try {
            if (selectedEvent && selectedEvent._id) {
                // Ensure selectedEvent and its id are available
                const eventId = selectedEvent._id;
                await axios.delete(
                    `http://localhost:55555/api/events/${eventId}/delete`
                );
                // Filter out the deleted event from the events array
                setEvents(events.filter((event) => event.id !== eventId));
                // Close the modal after deletion
                handleCloseModal();
                window.alert("Event deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleCloseModal = () => {
        if (modalMode === "create" && selectedEvent) {
            // If the modal mode is "create" and an event is selected
            // Remove the newly created event from the events array
            const filteredEvents = events.filter(
                (event) => event !== selectedEvent
            );
            setEvents(filteredEvents);
        }
        setSelectedEvent(null);
        setModalMode(null); // Reset modal mode
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    multiMonthPlugin,
                ]}
                //Properties
                initialView={"dayGridMonth"}
                themeSystem="standard"
                height={"100vh"}
                selectable="true"
                selectMirror="true"
                eventMaxStack={2}
                dayMaxEvents="true"
                dayMaxEventRows={3}
                editable={true}
                navLinks="true"
                eventResizableFromStart={true}
                nowIndicator="true"
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear,listMonth",
                }}
                views={{
                    dayGridMonth: {
                        titleFormat: { month: "long", year: "numeric" },
                    },
                    timeGridWeek: {
                        titleFormat: { month: "long", year: "numeric" },
                    },
                }}
                buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                    multiMonthYear: "Year",
                    listMonth: "Schedule",
                }}
                eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: "short",
                }}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
            />

            {selectedEvent && modalMode === "view" && (
                <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
                    {/* Render your modal content here using selectedEvent */}
                    {/* Example: */}
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedEvent.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{selectedEvent.describe}</p>
                        <p>From: {selectedEvent.start}</p>
                        <p>To: {selectedEvent.end}</p>
                        {/* Additional content and buttons */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDeleteEvent}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {selectedEvent && modalMode === "create" && (
                <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
                    {/* Render your modal content here using selectedEvent */}
                    <Modal.Header closeButton>
                        <Modal.Title>Create Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="title" className={`form-label`}>
                                Event Title
                            </label>
                            <input
                                {...register("title")}
                                type="text"
                                placeholder="Title of your Event"
                                className={`form-control`}
                                id="title"
                                autoComplete="off"
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Create
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Calendar;
