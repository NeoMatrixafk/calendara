import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ShowEventsApi, updateEventApi } from "../../Redux/actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import ColorPalette from "./ColorPalette";

//schema to validate event inputs
const schema = yup
    .object({
        title: yup.string().required("Can't Be Empty"),
        start: yup.date().required("Please specify the time to start"),
        end: yup
            .date("must be a valid date")
            .required("on update you must specify an end date"),
    })
    .required();

const UpdateEvent = ({ updateEventApi, event, error }) => {
    const mode = localStorage.getItem("mode");

    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [selectedColor, setSelectedColor] = useState(
        event.color || "#3174ad"
    ); // Default color from the event or a default color

    useEffect(() => {
        console.log(error);
        if (error && !firstRender) {
            setError(error);
        }
        if (!error.start && !error.end && dbError !== false) {
            setTimeout(navigate("/events"));
        }
    }, [rerender, dbError, error, firstRender, navigate]);
    //using form-hook to register event data
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: event.title,
            start: new Date(event.start),
            end: event.end ? new Date(event.end) : "",
            describe: event.describe
                ? event.describe
                : "No description was provided",
            color: event.color || "#3174ad", // Default color from the event or a default color
        },
    });

    const onSubmit = async (values) => {
        setFirstRender(false);
        values.color = selectedColor; // Add the color to the values object
        updateEventApi(values, event.id).then((res) => {
            console.log(res);
            setRerender(!rerender);
            if (res === "response was successful") {
                navigate("/events");
            }
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="container m-5"
                    >
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
                                placeholder="title"
                                className="form-control"
                                id="title"
                                aria-describedby="title"
                                style={{
                                    backgroundColor:
                                        mode === "light" ? "" : "#666B74",
                                    WebkitTextFillColor:
                                        mode === "light" ? "gray" : "#e6e6e6",
                                }}
                                autoComplete="off"
                            />
                            <p
                                className={`error text-warning position-absolute ${
                                    errors.title ? "active" : ""
                                }`}
                            >
                                {errors.title ? (
                                    <i className="bi bi-info-circle me-2"></i>
                                ) : (
                                    ""
                                )}
                                {errors.title?.message}
                            </p>
                        </div>
                        <div className="mb-4" style={{ zIndex: "100" }}>
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
                                        placeholderText="Select date"
                                        onChange={(date) =>
                                            field.onChange(date)
                                        }
                                        selected={field.value}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="form-control"
                                        id="start"
                                        autoComplete="off"
                                    />
                                )}
                            />
                            {/* error handling */}
                            <p
                                className={`error text-warning position-absolute ${
                                    errors.start ? "active" : ""
                                }`}
                            >
                                {errors.start ? (
                                    <i className=" bi bi-info-circle me-2"></i>
                                ) : (
                                    ""
                                )}
                                {errors.start?.message}
                            </p>
                            <p
                                className={`error text-warning position-absolute ${
                                    dbError.start ? "" : "d-none"
                                }`}
                            >
                                {dbError.start ? (
                                    <i className=" bi bi-info-circle me-2"></i>
                                ) : (
                                    ""
                                )}
                                {dbError.start}
                            </p>
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
                            {/* end date controller*/}
                            <Controller
                                control={control}
                                name="end"
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Select end date"
                                        onChange={(date) =>
                                            field.onChange(date)
                                        }
                                        selected={field.value}
                                        timeFormat="HH:mm"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        showTimeSelect
                                        className="form-control"
                                        id="end"
                                        autoComplete="off"
                                    />
                                )}
                            />
                            {/* error handling */}
                            <p
                                className={`error text-warning position-absolute ${
                                    errors.end ? "active" : ""
                                }`}
                            >
                                {errors.end ? (
                                    <i className=" bi bi-info-circle me-2"></i>
                                ) : (
                                    ""
                                )}
                                {errors.end?.message}
                            </p>
                            <p
                                className={`error text-warning position-absolute ${
                                    dbError.end ? "" : "d-none"
                                }`}
                            >
                                {dbError.end ? (
                                    <i className=" bi bi-info-circle me-2"></i>
                                ) : (
                                    ""
                                )}
                                {dbError.end}
                            </p>
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
                                placeholder="describe your event"
                                className="form-control"
                                id="describe"
                                aria-describedby="describe"
                                style={{
                                    backgroundColor:
                                        mode === "light" ? "" : "#666B74",
                                    WebkitTextFillColor:
                                        mode === "light" ? "gray" : "#e6e6e6",
                                }}
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="color"
                                className={`form-label me-4 text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                Event Color:
                            </label>
                            <ColorPalette
                                onSelectColor={setSelectedColor}
                                initialColor={selectedColor}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-warning btn-lg mt-4"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps({ event, error }) {
    return {
        event,
        error,
    };
}

export default connect(mapStateToProps, { updateEventApi, ShowEventsApi })(
    UpdateEvent
);
