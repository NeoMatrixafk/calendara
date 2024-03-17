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

import axios from "axios";
import moment from "moment";

import "../Calendar/calendar2.css";

const Calendar = ({ mode }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, control } = useForm();

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    const [defaultStartDate, setDefaultStartDate] = useState(null);
    const [defaultEndDate, setDefaultEndDate] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const userName = localStorage.getItem("userName");
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
                allDay: event.allDay,
            }));

            setEvents(convertedEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleDateSelect = (arg) => {
        const newEvent = {
            title: "No Title",
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay,
        };

        setSelectedEvent({
            title: "No Title",
            start: arg.start,
            end: arg.end,
            describe: "",
            allDay: arg.allDay,
        });

        setDefaultStartDate(new Date(arg.start));
        setDefaultEndDate(new Date(arg.end));
        setModalMode("create");
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    const handleEventClick = async (arg) => {
        try {
            const eventId = arg.event.id;
            setSelectedEventId(eventId);
            const response = await axios.get(
                `http://localhost:55555/api/events/${eventId}/show`
            );

            if (arg.event.allDay === true) {
                setSelectedEvent({
                    ...response.data,
                    start: moment(response.data.start).format("ddd DD MMM YY"),
                    end: moment(response.data.end).format("ddd DD MMM YY"),
                });
            } else {
                setSelectedEvent({
                    ...response.data,
                    start: moment(response.data.start).format(
                        "ddd DD MMM YY LT"
                    ),
                    end: moment(response.data.end).format("ddd DD MMM YY LT"),
                });
            }

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
        fetchEvents();
        setSelectedEvent(null);
        setDefaultStartDate(null);
        setDefaultEndDate(null);
        setModalMode(null);
    };

    const handleCreateEvent = async (data) => {
        try {
            const admin = localStorage.getItem("userName");
            const title = data.title || "No Title";

            const eventData = {
                admin: admin,
                title: title,
                start: defaultStartDate.toISOString(),
                end: defaultEndDate.toISOString(),
                describe: data.describe,
                allDay: data.allDay,
            };

            const response = await axios.post(
                "http://localhost:55555/api/events",
                eventData
            );

            const newEvent = {
                title: response.data.title,
                start: new Date(response.data.start),
                end: new Date(response.data.end),
                id: response.data._id,
                describe: response.data.describe,
                color: response.data.color,
                allDay: response.data.allDay,
            };

            setEvents([...events, newEvent]);
            setModalMode("create");
            fetchEvents();
            handleCloseModal();

            console.log("Event created successfully:", response.data);
            window.alert("Event created successfully!");
            navigate("/events2");
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    const handleMoreOptions = () => {
        navigate("/add-event", { state: { defaultStartDate, defaultEndDate } });
    };

    const handleUpdateEvent = async (arg) => {
        navigate(`/event/${selectedEventId}/update`);
    };

    return (
        <>
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
                    <Modal
                        show={selectedEvent !== null}
                        onHide={handleCloseModal}
                    >
                        <Modal.Header
                            closeButton
                            closeVariant={mode === "light" ? "black" : "white"}
                            style={{
                                backgroundColor:
                                    mode === "light" ? "" : "#36393e",
                            }}
                            className={`border border-${
                                mode === "light" ? "" : "secondary"
                            }`}
                        >
                            <Modal.Title
                                className={`text-capitalize text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                {selectedEvent.title}
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body
                            style={{
                                backgroundColor:
                                    mode === "light" ? "" : "#36393e",
                            }}
                            className={`border border-${
                                mode === "light" ? "" : "secondary"
                            }`}
                        >
                            <p
                                className={`lead text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                {selectedEvent.describe}
                            </p>
                            <p
                                className={`lead text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                From: {selectedEvent.start}
                            </p>
                            <p
                                className={`lead text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                To: {selectedEvent.end}
                            </p>
                        </Modal.Body>

                        <Modal.Footer
                            style={{
                                backgroundColor:
                                    mode === "light" ? "" : "#36393e",
                            }}
                            className={`border border-${
                                mode === "light" ? "" : "secondary"
                            }`}
                        >
                            <Button
                                variant="success"
                                onClick={handleUpdateEvent}
                            >
                                Update
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDeleteEvent}
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

                {selectedEvent && modalMode === "create" && (
                    <Modal
                        show={selectedEvent !== null}
                        onHide={handleCloseModal}
                    >
                        <Modal.Header
                            closeButton
                            closeVariant={mode === "light" ? "black" : "white"}
                            style={{
                                backgroundColor:
                                    mode === "light" ? "" : "#36393e",
                            }}
                            className={`border border-${
                                mode === "light" ? "" : "secondary"
                            }`}
                        >
                            <Modal.Title
                                className={`text-capitalize text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                Add Event
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body
                            style={{
                                backgroundColor:
                                    mode === "light" ? "" : "#36393e",
                            }}
                            className={`border border-${
                                mode === "light" ? "" : "secondary"
                            }`}
                        >
                            <form onSubmit={handleSubmit(handleCreateEvent)}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className={`form-label text-${
                                            mode === "light" ? "black" : "white"
                                        }`}
                                    >
                                        Event Title
                                    </label>
                                    <input
                                        {...register("title")}
                                        type="text"
                                        placeholder="Title of your Event"
                                        className={`form-control text-${
                                            mode === "light"
                                                ? "secondary"
                                                : "light"
                                        }`}
                                        id="title"
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mb-2" style={{ zIndex: "100" }}>
                                    <label
                                        htmlFor="start"
                                        className={`form-label me-3 text-${
                                            mode === "light" ? "black" : "white"
                                        }`}
                                    >
                                        Start Date:
                                    </label>

                                    <Controller
                                        control={control}
                                        name="start"
                                        render={({ field }) => (
                                            <DatePicker
                                                placeholderText="Select start date"
                                                onChange={(date) =>
                                                    field.onChange(date)
                                                }
                                                selected={
                                                    field.value ||
                                                    defaultStartDate
                                                }
                                                value={
                                                    field.value ||
                                                    defaultStartDate
                                                }
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                className={`form-control text-${
                                                    mode === "light"
                                                        ? "secondary"
                                                        : "light"
                                                }`}
                                                style={{
                                                    WebkitTextFillColor:
                                                        "white",
                                                }}
                                                id="start"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="mb-1" style={{ zIndex: "100" }}>
                                    <label
                                        htmlFor="allDay"
                                        className={`form-label me-4 text-${
                                            mode === "light" ? "black" : "white"
                                        }`}
                                    >
                                        All Day:
                                    </label>

                                    <input
                                        type="checkbox"
                                        {...register("allDay")}
                                        id="allDay"
                                        className={`form-check-input`}
                                    />
                                </div>

                                <div className="mb-4" style={{ zIndex: "100" }}>
                                    <label
                                        htmlFor="end"
                                        className={`form-label me-4 text-${
                                            mode === "light" ? "black" : "white"
                                        }`}
                                    >
                                        End Date:
                                    </label>

                                    <Controller
                                        control={control}
                                        name="end"
                                        render={({ field }) => (
                                            <DatePicker
                                                placeholderText="Select end date"
                                                onChange={(date) =>
                                                    field.onChange(date)
                                                }
                                                selected={
                                                    field.value ||
                                                    defaultEndDate
                                                }
                                                value={
                                                    field.value ||
                                                    defaultEndDate
                                                }
                                                timeFormat="HH:mm"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                showTimeSelect
                                                className={`form-control text-${
                                                    mode === "light"
                                                        ? "black"
                                                        : "white"
                                                }`}
                                                id="end"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="describe"
                                        className={`form-label text-${
                                            mode === "light" ? "black" : "white"
                                        }`}
                                    >
                                        Event Description{" "}
                                        <span className="text-danger small">
                                            (optional)
                                        </span>
                                    </label>

                                    <input
                                        {...register("describe")}
                                        type="text"
                                        placeholder="Describe your event"
                                        className={`form-control text-${
                                            mode === "light" ? "black" : "white"
                                        }`}
                                        id="describe"
                                        aria-describedby="describe"
                                        autoComplete="off"
                                    />
                                </div>
                            </form>
                        </Modal.Body>

                        <Modal.Footer
                            style={{
                                backgroundColor:
                                    mode === "light" ? "" : "#36393e",
                            }}
                            className={`border border-${
                                mode === "light" ? "" : "secondary"
                            }`}
                        >
                            <Button
                                variant="primary"
                                onClick={handleMoreOptions}
                            >
                                More Options
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleSubmit(handleCreateEvent)}
                            >
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default Calendar;
