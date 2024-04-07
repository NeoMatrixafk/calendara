//React imports
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addEventApi } from "../../Redux/actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import ColorPalette from "./ColorPalette";

const schema = yup
    .object({
        title: yup.string().required("Can't Be Empty"),
        start: yup.date().required("Please specify the time to start"),
        end: yup.date().required("Please specify the time to end"),
    })
    .required();

const AddEvents = ({ addEventApi, error, mode }) => {
    //Hooks
    const navigate = useNavigate();

    //States
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [userName] = useState(localStorage.getItem("userName") || "");
    const [email] = useState(localStorage.getItem("email") || "");
    const [selectedColor, setSelectedColor] = useState("#2196f3"); // Default color

    const location = useLocation();
    const {
        defaultTitle,
        defaultDesc,
        defaultStartDate,
        defaultEndDate,
        defaultStatus,
    } = location.state || {};

    const [status, setStatus] = useState(defaultStatus || "Unresolved");

    //Handling functions
    useEffect(() => {
        if (error && !firstRender) {
            setError(error);
        }
        if (!error.start && !error.end && dbError !== false) {
            setTimeout(navigate("/events2"));
        }
    }, [rerender, error, dbError, firstRender, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: defaultTitle || "No Title",
            start: defaultStartDate || null,
            end: defaultEndDate || null,
            describe: defaultDesc || "",
            status: defaultStatus || "Unresolved",
        },
    });

    const onSubmit = async (values) => {
        try {
            await schema.validate(values, { abortEarly: false });
            localStorage.setItem("categoryColor", selectedColor);
        } catch (validationError) {
            // Yup validation failed, show alert or handle the error
            window.alert(validationError.message);
            return;
        }

        values.admin = email;
        values.color = selectedColor;
        values.status = status;

        setFirstRender(false);
        addEventApi(values).then(() => {
            setRerender(!rerender);
            window.alert("Event created successfully!");
            navigate("/events2");
        });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-10">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="container m-5"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="admin"
                                    className={`form-label text-${
                                        mode === "light" ? "black" : "white"
                                    }`}
                                >
                                    Admin
                                </label>
                                <input
                                    {...register("admin")}
                                    type="text"
                                    value={userName}
                                    className={`form-control text-${
                                        mode === "light" ? "secondary" : "light"
                                    }`}
                                    id="admin"
                                    aria-describedby="admin"
                                    style={{
                                        backgroundColor:
                                            mode === "light" ? "" : "#666B74",
                                        WebkitTextFillColor:
                                            mode === "light"
                                                ? "gray"
                                                : "#e6e6e6",
                                    }}
                                    autoComplete="off"
                                    readOnly
                                />
                            </div>

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
                                        mode === "light" ? "secondary" : "light"
                                    }`}
                                    id="title"
                                    aria-describedby="title"
                                    style={{
                                        backgroundColor:
                                            mode === "light" ? "" : "#666B74",
                                        WebkitTextFillColor:
                                            mode === "light"
                                                ? "gray"
                                                : "#e6e6e6",
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
                                            placeholderText="Select start date"
                                            onChange={(date) =>
                                                field.onChange(date)
                                            }
                                            selected={
                                                field.value || defaultStartDate
                                            }
                                            value={
                                                field.value || defaultStartDate
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
                                                WebkitTextFillColor: "white",
                                            }}
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
                                            selected={
                                                field.value || defaultEndDate
                                            }
                                            value={
                                                field.value || defaultEndDate
                                            }
                                            timeFormat="HH:mm"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            showTimeSelect
                                            className={`form-control text-${
                                                mode === "light"
                                                    ? "secondary"
                                                    : "light"
                                            }`}
                                            id="end"
                                            autoComplete="off"
                                        />
                                    )}
                                />
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
                                    className={`form-label text-${
                                        mode === "light" ? "black" : "white"
                                    }`}
                                >
                                    Status:
                                </label>
                                <div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="completed"
                                            name="status"
                                            value="Completed"
                                            checked={status === "Completed"}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
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
                                    </div>

                                    <div>
                                        <input
                                            type="radio"
                                            id="overdue"
                                            name="status"
                                            value="Overdue"
                                            checked={status === "Overdue"}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
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
                                    </div>

                                    <div>
                                        <input
                                            type="radio"
                                            id="upcoming"
                                            name="status"
                                            value="Upcoming"
                                            checked={status === "Upcoming"}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
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
                                        mode === "light" ? "secondary" : "light"
                                    }`}
                                    id="describe"
                                    aria-describedby="describe"
                                    style={{
                                        backgroundColor:
                                            mode === "light" ? "" : "#666B74",
                                        WebkitTextFillColor:
                                            mode === "light"
                                                ? "gray"
                                                : "#e6e6e6",
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
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success btn-lg mt-4"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ event, error }) {
    return {
        error,
        // event
    };
}

export default connect(mapStateToProps, { addEventApi })(AddEvents);
