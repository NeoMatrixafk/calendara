import React, { useState } from "react";
import axios from "axios";

const UpdateProfile = (props) => {
    const [imageData, setImageData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const admin = localStorage.getItem("userName");
    const imageData1 = localStorage.getItem("userProfileImage");
    const [data, setData] = useState({
        admin: admin,
        imageData: imageData1

    });


    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const data = event.target.result;
                setImageData(data);
                setImagePreview(data); // Set image preview
            };

            reader.readAsDataURL(file);
        }
    };

    const storeImage = async() => {
        if (imageData) {
            localStorage.setItem("userProfileImage", imageData);
            setSuccessMessage("Image successfully updated!");
        }

        try {
            
            const url = "http://localhost:55555/api/profilepic";

            // Send a POST request to the server with FormData
            const response = await axios.post(url, data);
            console.log(data)

            if (response.data.success) {
                setSuccessMessage("Image successfully updated!");
            } else {
                console.error("Failed to update image");
            }
        } catch (error) {
            console.error("Error updating image:", error);
        }

    };

    return (
        <>
            <div className="container my-5">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Update Profile Picture
                </h3>
                <div className="container mt-3" style={{ width: "50%" }}>
                    <div className="input-group mb-3">
                        <input
                            type="file"
                            className={`form-control ${
                                props.mode === "light" ? "" : "border-secondary"
                            }`}
                            id="inputGroupFile"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "" : "#e6e6e6",
                            }}
                        />
                    </div>
                    {imagePreview && (
                        <div className="mt-5 d-flex justify-content-center">
                            <p
                                className={`m-0 d-flex align-items-center me-5 text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                style={{ fontSize: "1.5rem" }}
                            >
                                Selected Image Preview:
                            </p>
                            <img
                                src={imagePreview}
                                alt="Selected Preview"
                                style={{
                                    width: "14rem",
                                    borderRadius: "7rem",
                                }}
                            />
                        </div>
                    )}
                    {successMessage && (
                        <div
                            className={`alert alert-${
                                props.mode === "light" ? "primary" : "warning"
                            } mt-3`}
                            role="alert"
                        >
                            {successMessage}
                        </div>
                    )}
                </div>
                <div className="container d-flex justify-content-center mt-5">
                    <button
                        className={`btn btn-${
                            props.mode === "light" ? "primary" : "warning"
                        }`}
                        onClick={storeImage}
                    >
                        Update Image
                    </button>
                </div>
            </div>
            <div className="container my-5">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Update User Name
                </h3>
                <div className="container mt-3" style={{ width: "50%" }}>
                    <p
                        style={{ fontSize: "1.25rem" }}
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Current User Name: {localStorage.getItem("userName")}
                    </p>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                props.mode === "light" ? "" : "border-secondary"
                            }`}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "" : "#e6e6e6",
                            }}
                            placeholder="New User Name"
                        />
                        <button
                            className={`btn btn-${
                                props.mode === "light" ? "primary" : "warning"
                            }`}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Update Contact Number
                </h3>
                <div className="container mt-3" style={{ width: "50%" }}>
                    <p
                        style={{ fontSize: "1.25rem" }}
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Current Contact Number:{" "}
                        {localStorage.getItem("contact")}
                    </p>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                props.mode === "light" ? "" : "border-secondary"
                            }`}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "" : "#e6e6e6",
                            }}
                            placeholder="New Contact Number"
                        />
                        <button
                            className={`btn btn-${
                                props.mode === "light" ? "primary" : "warning"
                            }`}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Update Email
                </h3>
                <div className="container mt-3" style={{ width: "50%" }}>
                    <p
                        style={{ fontSize: "1.25rem" }}
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Current Email: {localStorage.getItem("email")}
                    </p>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                props.mode === "light" ? "" : "border-secondary"
                            }`}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "" : "#e6e6e6",
                            }}
                            placeholder="New Email"
                        />
                        <button
                            className={`btn btn-${
                                props.mode === "light" ? "primary" : "warning"
                            }`}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Update Password
                </h3>
                <div className="container mt-3" style={{ width: "50%" }}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                props.mode === "light" ? "" : "border-secondary"
                            }`}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "" : "#e6e6e6",
                            }}
                            placeholder="Enter Current Password"
                        />
                        <div className="input-group mt-3">
                            <input
                                type="text"
                                className={`form-control ${
                                    props.mode === "light"
                                        ? ""
                                        : "border-secondary"
                                }`}
                                style={{
                                    backgroundColor:
                                        props.mode === "light" ? "" : "#4d4d4d",
                                    WebkitTextFillColor:
                                        props.mode === "light" ? "" : "#e6e6e6",
                                }}
                                placeholder="Enter New Password"
                            />
                            <button
                                className={`btn btn-${
                                    props.mode === "light"
                                        ? "primary"
                                        : "warning"
                                }`}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
