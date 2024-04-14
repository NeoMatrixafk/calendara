//React imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

//FullCalendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";

//backend imports
import axios from "axios";
import moment from "moment";

//styles imports
import "../Calendar/calendar.css";

const Calendar = ({ mode }) => {
    //Hooks
    const navigate = useNavigate();
    const { register, handleSubmit, control, reset } = useForm();

    //States
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    const [status, setStatus] = useState("Unresolved");

    const [defaultTitle, setDefaultTitle] = useState(null);
    const [defaultDesc, setDefaultDesc] = useState(null);
    const [defaultStartDate, setDefaultStartDate] = useState(null);
    const [defaultEndDate, setDefaultEndDate] = useState(null);
    const [defaultStatus, setDefaultStatus] = useState(null);

    //Handling Functions
    useEffect(() => {
        fetchEvents();
        const interval = setInterval(fetchEvents, 10000); // Fetch every 10 secs
        return () => clearInterval(interval); // Cleanup
    }, []);

    const fetchEvents = async () => {
        try {
            const email = localStorage.getItem("email");
            const response = await axios.get(
                `http://localhost:55555/api/events/${email}`
            );

            const convertedEvents = response.data.map((event) => {
                let borderColor;

                // Adjust borderColor based on event status
                switch (event.status) {
                    case "Unresolved":
                        borderColor = null;
                        break;
                    case "Completed":
                        borderColor = "green";
                        break;
                    case "Upcoming":
                        borderColor = "yellow";
                        break;
                    case "Overdue":
                        borderColor = "red";
                        break;
                    default:
                        console.log(
                            "Unknown status, setting borderColor to null"
                        );
                        borderColor = null;
                        break;
                }

                return {
                    title: event.title,
                    start: new Date(event.start),
                    end: new Date(event.end),
                    id: event._id,
                    describe: event.describe,
                    color: event.color,
                    allDay: event.allDay,
                    borderColor: borderColor, // Assign borderColor based on status
                };
            });

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

    const handleCreateEvent = async (data) => {
        try {
            const admin = localStorage.getItem("email");
            const title = data.title || "No Title";

            const eventData = {
                admin: admin,
                title: title,
                start: data.start || defaultStartDate.toISOString(),
                end: data.end || defaultEndDate.toISOString(),
                describe: data.describe,
                allDay: data.allDay,
                status: status,
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
                status: response.data.status,
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

    const handleChange = (event) => {
        //To show entered values in add event modal to add event page

        const { name, value } = event.target;

        if (name === "title") {
            setDefaultTitle(value);
        } else if (name === "describe") {
            setDefaultDesc(value);
        } else if (name === "status") {
            setStatus(value);
            setDefaultStatus(value);
        }
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

    const handleMoreOptions = () => {
        navigate("/add-event", {
            state: {
                defaultDesc,
                defaultTitle,
                defaultStartDate,
                defaultEndDate,
                defaultStatus,
            },
        });
    };

    const handleUpdateEvent = async () => {
        navigate(`/event/${selectedEventId}/update`, {
            state: { selectedEvent, selectedEventId },
        });
    };

    const handleEventResize = async (arg) => {
        try {
            const eventToUpdate = events.find(
                (event) => event.id === arg.event.id
            );

            if (eventToUpdate) {
                // Check if it's a resize within the day grid or time grid
                const isAllDay = arg.event.allDay;
                const start = arg.event.start;
                const end = arg.event.end;

                if (!isAllDay && isMultiDayEvent(start, end)) {
                    // Prevent resizing by resetting the event's start and end times to their original values
                    arg.revert();
                } else {
                    // Update the event normally for other cases
                    if (isAllDay) {
                        eventToUpdate.start = start;
                        eventToUpdate.end = end;
                    } else {
                        eventToUpdate.start.setHours(
                            start.getHours(),
                            start.getMinutes()
                        );
                        eventToUpdate.end.setHours(
                            end.getHours(),
                            end.getMinutes()
                        );
                    }

                    setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                            event.id === eventToUpdate.id
                                ? eventToUpdate
                                : event
                        )
                    );

                    await axios.put(
                        `http://localhost:55555/api/events/${eventToUpdate.id}/update`,
                        eventToUpdate
                    );

                    window.alert("Event updated successfully!");
                }
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const isMultiDayEvent = (start, end) => {
        // Check if the event spans multiple days
        return start.toDateString() !== end.toDateString();
    };

    const handleEventDrop = async (arg) => {
        try {
            const eventToUpdate = events.find(
                (event) => event.id === arg.event.id
            );

            if (eventToUpdate) {
                const isAllDay = arg.event.allDay;
                const start = arg.event.start;
                const end = arg.event.end || start;

                if (isAllDay !== eventToUpdate.allDay) {
                    if (!isAllDay) {
                        // If the event is moved from all-day to a specific time slot

                        const startDate = new Date(start);
                        const endDate = end ? new Date(end) : new Date(start);
                        eventToUpdate.start = startDate;
                        eventToUpdate.end = endDate;
                        eventToUpdate.allDay = false;
                    } else {
                        // If the event is moved from a specific time slot to all-day

                        const startDate = new Date(start);
                        const endDate = end
                            ? new Date(end)
                            : new Date(
                                  startDate.getFullYear(),
                                  startDate.getMonth(),
                                  startDate.getDate() + 1
                              );
                        eventToUpdate.start = startDate;
                        eventToUpdate.end = endDate;
                        eventToUpdate.allDay = true;
                    }
                } else {
                    // If the event is dragged within the same view, update its start and end dates

                    eventToUpdate.start = start;
                    eventToUpdate.end = end;
                }

                setEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event.id === eventToUpdate.id ? eventToUpdate : event
                    )
                );

                await axios.put(
                    `http://localhost:55555/api/events/${eventToUpdate.id}/update`,
                    eventToUpdate
                );

                window.alert("Event updated successfully!");
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const handleDeleteEvent = async () => {
        try {
            if (selectedEvent && selectedEvent._id) {
                const eventId = selectedEvent._id;
                await axios.delete(
                    `http://localhost:55555/api/events/${eventId}/delete`
                );

                setEvents(events.filter((event) => event.id !== eventId));

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
        setDefaultTitle(null);
        setDefaultStartDate(null);
        setDefaultEndDate(null);
        setStatus(null);
        setDefaultStatus(null);
        setModalMode(null);
        reset();
    };

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin,
                                multiMonthPlugin,
                            ]}
                            //Properties
                            locale="en"
                            initialView={"dayGridMonth"}
                            themeSystem="bootstrap5"
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
                                    titleFormat: {
                                        month: "long",
                                        year: "numeric",
                                    },
                                },
                                timeGridWeek: {
                                    titleFormat: {
                                        month: "long",
                                        year: "numeric",
                                    },
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
                                //omitZeroMinute: false, // Include zero minutes
                                //hour12: false, // Use 24-hour format
                            }}
                            events={events}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            eventResize={handleEventResize}
                            eventDrop={handleEventDrop}
                        />
                    </div>
                </div>

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
                            <p
                                className={`lead text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                Status: {selectedEvent.status}
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
                                        placeholder="No Title"
                                        className={`form-control text-${
                                            mode === "light"
                                                ? "secondary"
                                                : "light"
                                        }`}
                                        style={{
                                            backgroundColor:
                                                mode === "dark"
                                                    ? "#666B74"
                                                    : "white",
                                            WebkitTextFillColor:
                                                mode === "dark" ? "white" : "",
                                        }}
                                        id="title"
                                        autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3" style={{ zIndex: "100" }}>
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
                                                        ? "black"
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

                                <div className="mb-3" style={{ zIndex: "100" }}>
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
                                        style={{ marginLeft: "3%" }}
                                    />
                                </div>

                                <div className="mb-3" style={{ zIndex: "100" }}>
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

                                <div className="mb-3">
                                    <label
                                        className={`form-label text-${
                                            mode === "light" ? "black" : "white"
                                        }`}
                                    >
                                        Status:
                                    </label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="completed"
                                            name="status"
                                            value="Completed"
                                            checked={status === "Completed"}
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="completed"
                                            className={`form-label ms-2 me-4 text-${
                                                mode === "light"
                                                    ? "black"
                                                    : "white"
                                            }`}
                                        >
                                            Completed
                                        </label>

                                        <input
                                            type="radio"
                                            id="overdue"
                                            name="status"
                                            value="Overdue"
                                            checked={status === "Overdue"}
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="overdue"
                                            className={`form-label ms-2 me-4 text-${
                                                mode === "light"
                                                    ? "black"
                                                    : "white"
                                            }`}
                                        >
                                            Overdue
                                        </label>

                                        <input
                                            type="radio"
                                            id="upcoming"
                                            name="status"
                                            value="Upcoming"
                                            checked={status === "Upcoming"}
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="upcoming"
                                            className={`form-label ms-2 me-4 text-${
                                                mode === "light"
                                                    ? "black"
                                                    : "white"
                                            }`}
                                        >
                                            Upcoming
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-3">
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
                                        style={{
                                            backgroundColor:
                                                mode === "dark"
                                                    ? "#666B74"
                                                    : "white",
                                            WebkitTextFillColor:
                                                mode === "dark" ? "white" : "",
                                        }}
                                        id="describe"
                                        aria-describedby="describe"
                                        autoComplete="off"
                                        onChange={handleChange}
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
