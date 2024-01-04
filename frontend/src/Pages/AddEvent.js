// AddEvent.jsx

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import EventForm from "../Components/Calendar/EventForm";

const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
    const goToToday = () => {
        toolbar.onNavigate("TODAY");
    };

    const goToNext = () => {
        toolbar.onNavigate("NEXT");
    };

    const goToPrev = () => {
        toolbar.onNavigate("PREV");
    };

    const goToView = (view) => {
        toolbar.onView(view);
    };

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <span className="rbc-toolbar-label">
                {date.format("MMMM YYYY")}
            </span>
        );
    };

    return (
        <div className="rbc-toolbar d-flex justify-content-between">
            <div className="rbc-toolbar-left">
                <div className="button-group">
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={goToPrev}
                        style={{
                            backgroundColor:
                                toolbar.mode === "light"
                                    ? "#ADD8E6"
                                    : "#f0f0f0",
                            color: "black",
                            margin: "2.50px",
                        }}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={goToToday}
                        style={{
                            backgroundColor:
                                toolbar.mode === "light"
                                    ? "#ADD8E6"
                                    : "#f0f0f0",
                            color: "black",
                            margin: "2.50px",
                        }}
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={goToNext}
                        style={{
                            backgroundColor:
                                toolbar.mode === "light"
                                    ? "#ADD8E6"
                                    : "#f0f0f0",
                            color: "black",
                            margin: "2.50px",
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="rbc-toolbar-center">{label()}</div>
            <div className="rbc-toolbar-right">
                <div className="button-group">
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={() => goToView("month")}
                        style={{
                            backgroundColor:
                                toolbar.mode === "light"
                                    ? "#ADD8E6"
                                    : "#f0f0f0",
                            color: "black",
                            margin: "2.50px",
                        }}
                    >
                        Month
                    </button>
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={() => goToView("week")}
                        style={{
                            backgroundColor:
                                toolbar.mode === "light"
                                    ? "#ADD8E6"
                                    : "#f0f0f0",
                            color: "black",
                            margin: "2.50px",
                        }}
                    >
                        Week
                    </button>
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={() => goToView("day")}
                        style={{
                            backgroundColor:
                                toolbar.mode === "light"
                                    ? "#ADD8E6"
                                    : "#f0f0f0",
                            color: "black",
                            margin: "2.50px",
                        }}
                    >
                        Day
                    </button>
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={() => goToView("agenda")}
                        style={{
                            backgroundColor:
                                toolbar.mode === "light"
                                    ? "#ADD8E6"
                                    : "#f0f0f0",
                            color: "black",
                            margin: "2.50px",
                        }}
                    >
                        Agenda
                    </button>
                </div>
            </div>
        </div>
    );
};

const AddEvent = (props) => {
    const [events, setEvents] = useState([]);

    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const dayPropGetter = (date) => {
        const isCurrentDate = moment(date)
            .startOf("day")
            .isSame(moment(), "day");

        if (isCurrentDate) {
            return {
                className: "current-date",
                style: {
                    backgroundColor: props.mode === "light" ? "" : "gray",
                },
            };
        }

        return {};
    };

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-3">
                        <EventForm
                            onAddEvent={handleAddEvent}
                            mode={props.mode}
                        />
                    </div>
                    <div className="col-md-9">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            dayPropGetter={dayPropGetter}
                            style={{
                                height: "35rem",
                                backgroundColor:
                                    props.mode === "light" ? "" : "#36393e",
                                color:
                                    props.mode === "light"
                                        ? "black"
                                        : "#f5f5f5",
                            }}
                            components={{
                                toolbar: (toolbar) => (
                                    <CustomToolbar
                                        {...toolbar}
                                        mode={props.mode}
                                    />
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEvent;
