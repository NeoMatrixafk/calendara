import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addEventApi } from "../../Redux/actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import ColorPalette from "./ColorPalette";
// import { set } from "date-fns";

//schema to validate event inputs
const schema = yup.object({
        title: yup.string().required("Can't Be Empty"),
        start: yup.date().required("Please specify the time to start"),
    }).required();

const AddEvents = ({ addEventApi, error, mode }) => {
    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [selectedColor, setSelectedColor] = useState("#3174ad"); // Default color

    useEffect(() => {
        if (error && !firstRender) {
            setError(error);
        }
        if (!error.start && !error.end && dbError !== false) {
            setTimeout(navigate("/events"));
        }
    }, [rerender, error, dbError, firstRender, navigate]);
    //using form-hook to register event data
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values) => {
        values.color = selectedColor;

        setFirstRender(false);
        addEventApi(values).then(() => {
            setRerender(!rerender);
            window.alert("Event created successfully!");
            navigate("/events");
        });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className=" align-content-center m-5"
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
                                    placeholder="Title of your Event"
                                    className="form-control"
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
                                {/* controllers are the way you can wrap and use datePicker inside react form-hook*/}
                                {/* start date controller*/}
                                <Controller
                                    control={control}
                                    name="start"
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select start date"
                                            onChange={(date) =>
                                                field.onChange(date)
                                            }
                                            selected={field.value}
                                            value={field.value}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            className={`form-control datepicker-${mode}`}
                                            id="start"
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
                                            value={field.value}
                                            timeFormat="HH:mm"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            showTimeSelect
                                            className={`form-control datepicker-${mode}`}
                                            id="end"
                                        />
                                    )}
                                />
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
                                    placeholder="Describe your event"
                                    className="form-control"
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
