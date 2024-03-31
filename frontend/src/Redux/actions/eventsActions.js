import { event } from "../Axios/event";
import * as moment from "moment";
import { addError, removeError } from "./errorsAction";

export const showEvent = (event) => {
    console.log("event to be shown on the modal: ", event);
    return {
        type: "SHOW_EVENT",
        payload: event,
    };
};

export const showEvents = (events) => {
    return {
        type: "SHOW_EVENTS",
        payload: events,
    };
};

export const ShowEventApi = (id) => async (dispatch) => {
    const result = await event.get(`/${id}/show`);

    try {
        const { title, _id, start, end, describe, color } = await result.data;
        const convertedEvent = {
            title,
            describe,
            id: _id,
            start: moment(start).format("ddd DD MMM YY LT"),
            end: moment(end).format("ddd DD MMM YY LT"),
            color,
        };
        await dispatch(showEvent(convertedEvent));
    } catch (err) {
        const error = await err.data.message;
        return error;
    }
};

export const ShowEventsApi = (userName) => async (dispatch) => {
    console.log("started fetching the api");

    const result = await event.get(`/${userName}`);

    try {
        const convertedDates = await result.data.map((event) => {
            return {
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end),
                id: event._id,
                describe: event.describe,
                color: event.color,
            };
        });
        await dispatch(showEvents(convertedDates));
    } catch (err) {
        const error = await err.data.message;
        return error;
    }
};

export const deleteEvent = (id) => {
    return {
        type: "DELETE_EVENT",
        payload: id,
    };
};

export const deleteEventApi = (id) => async (dispatch) => {
    const result = await event.delete(`/${id}/delete`);

    try {
        const deleted = await result.data;
        await dispatch(deleteEvent(id));
        return { deleted };
    } catch (err) {
        const message = await result.data.message;
        console.log(message);
        return { message };
    }
};

const addEvent = (newEvent) => {
    return {
        type: "ADD_EVENT",
        payload: newEvent,
    };
};

export const addEventApi = (values) => async (dispatch) => {
    await event
        .post("/", {
            admin: values.admin,
            title: values.title,
            start: values.start,
            end: values.end,
            describe: values.describe,
            color: values.color,
            allDay: values.allDay,
            status: values.status,
        })
        .then((res) => {
            if (res && res.data) {
                console.log(
                    "event from the api going to the reducer: ",
                    res.data
                );
                dispatch(addEvent(res.data));
                dispatch(removeError());

                return "success";
            }
        })
        .catch((res) => {
            console.log("catch response, ", res);
            if (res.response.data) {
                console.log(res.response.data);
                dispatch(addError(res.response.data));
            }
        });
};

const updateEvent = (updatedEvent) => {
    return {
        type: "UPDATE_EVENT",
        payload: updatedEvent,
    };
};

export const updateEventApi = (values, id) => async (dispatch) => {
    try {
        const result = await event.put(`/${id}/update`, {
            title: values.title,
            start: values.start,
            end: values.end,
            describe: values.describe,
            color: values.color,
            allDay: values.allDay,
            status: values.status,
            uploaded: false
        });
        console.log(result);
        const response = result.data;
        dispatch(updateEvent(response));
        dispatch(removeError());
        return "response was successful";
    } catch (err) {
        console.log(err);
        dispatch(addError(err.response.data));
    }
};
