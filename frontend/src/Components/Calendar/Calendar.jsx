import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enGB from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popping from "./Popping";
import { closeEvent, ShowEventApi, ShowEventsApi } from "../../Redux/actions";
import { connect } from "react-redux";



const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { "en-GB": enGB }
});

const MyCalendar = ({
    events,
    ShowEventApi,
    closeEvent,
    ShowEventsApi,
    mode,
}) => {
    const [open, setOpen] = useState(false);
    const [renderStatus, rerender] = useState(false);
    const [userName] = useState(localStorage.getItem("userName") || "");

    useEffect(() => {
        ShowEventsApi(userName);
        console.log("events shown - refresh/start");
    }, [ShowEventsApi, userName]);

    useEffect(() => {
        ShowEventsApi(userName);
        console.log("events shown");
    }, [renderStatus, ShowEventsApi, userName]);

    const openEventClick = (event) => {
        setOpen(true);
        if (event.id) {
            ShowEventApi(event.id);
        }

        return;
    };

    const closeEventClick = () => {
        setOpen(false);
        setTimeout(() => closeEvent(), 300);
    };

    const eventPropGetter = (event) => {
        const backgroundColor = event.color || "#3174ad"; // Default color or custom color property
        return { style: { backgroundColor } };
    };

    return (
        <div>
            <Popping
                open={open}
                handleOpen={openEventClick}
                handleClose={closeEventClick}
                renderStatus={renderStatus}
                rerender={rerender}
                mode={mode}
            />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600, margin: 50 }}
                eventPropGetter={eventPropGetter}
                onSelectEvent={openEventClick}
            />
        </div>
    );
};

function mapStateToProps({ event, events }) {
    return {
        event,
        events,
    };
}

export default connect(mapStateToProps, {
    ShowEventApi,
    closeEvent,
    ShowEventsApi,
})(MyCalendar);
