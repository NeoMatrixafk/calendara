import React, { useState } from "react";
import axios from "axios";

const UpdateProfile = (props) => {
    const [profileImageData, setProfileImageData] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [successProfileMesage, setSuccessProfileMesage] = useState(null);
    const admin = localStorage.getItem("userName");
    const profileImageData1 = localStorage.getItem("userProfileImage");
    const [profileData, seProfiletData] = useState({
        admin: admin,
        profileImageData: profileImageData1,
    });

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const profileData = event.target.result;
                setProfileImageData(profileData);
                setProfileImagePreview(profileData); // Set image preview
            };

            reader.readAsDataURL(file);
        }
    };

    const storeProfileImage = async () => {
        if (profileImageData) {
            localStorage.setItem("userProfileImage", profileImageData);
            setSuccessProfileMesage("Image successfully updated!");
        }

        try {
            const url = "http://localhost:55555/api/profilepic";

            // Send a POST request to the server with FormData
            const response = await axios.post(url, profileData);
            console.log(profileData);

            if (response.data.success) {
                setSuccessProfileMesage("Image successfully updated!");
            } else {
                console.error("Failed to update image");
            }
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    const [backgroundImageData, setBackgroundImageData] = useState(null);
    const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
    const backgroundImageData1 = localStorage.getItem("userBackgroundImage");
    const [backgroundSuccessMessage, setBackgroundSuccessMessage] =
        useState(null);
    const [backgroundData, setBackgroundData] = useState({
        admin: admin,
        backgroundImageData: backgroundImageData1,
    });

    const handleBackgroundImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const backgroundData = event.target.result;
                setBackgroundImageData(backgroundData);
                setBackgroundImagePreview(backgroundData); // Set image preview
            };

            reader.readAsDataURL(file);
        }
    };

    const storeBackgroundImage = async () => {
        if (backgroundImageData) {
            localStorage.setItem("userBackgroundImage", backgroundImageData);
            setBackgroundSuccessMessage("Image successfully updated!");
        }

        try {
            const url = "http://localhost:55555/api/profilepic";

            // Send a POST request to the server with FormData
            const response = await axios.post(url, backgroundData);
            console.log(backgroundData);

            if (response.data.success) {
                setBackgroundSuccessMessage("Image successfully updated!");
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
                            onChange={handleProfileImageChange}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "" : "#e6e6e6",
                            }}
                        />
                    </div>
                    {profileImagePreview && (
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
                                src={profileImagePreview}
                                alt="Selected Preview"
                                style={{
                                    width: "14rem",
                                    borderRadius: "7rem",
                                }}
                            />
                        </div>
                    )}
                    {successProfileMesage && (
                        <div
                            className={`alert alert-${
                                props.mode === "light" ? "primary" : "warning"
                            } mt-3`}
                            role="alert"
                        >
                            {successProfileMesage}
                        </div>
                    )}
                </div>
                <div className="container d-flex justify-content-center mt-5">
                    <button
                        className={`btn btn-${
                            props.mode === "light" ? "primary" : "warning"
                        }`}
                        onClick={storeProfileImage}
                    >
                        Update Profile Image
                    </button>
                </div>
            </div>
            <div className="container my-5">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Update Background Picture
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
                            onChange={handleBackgroundImageChange}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "" : "#e6e6e6",
                            }}
                        />
                    </div>
                    {backgroundImagePreview && (
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
                                src={backgroundImagePreview}
                                alt="Selected Preview"
                                style={{
                                    width: "14rem",
                                }}
                            />
                        </div>
                    )}
                    {backgroundSuccessMessage && (
                        <div
                            className={`alert alert-${
                                props.mode === "light" ? "primary" : "warning"
                            } mt-3`}
                            role="alert"
                        >
                            {backgroundSuccessMessage}
                        </div>
                    )}
                </div>
                <div className="container d-flex justify-content-center mt-5">
                    <button
                        className={`btn btn-${
                            props.mode === "light" ? "primary" : "warning"
                        }`}
                        onClick={storeBackgroundImage}
                    >
                        Update Background Image
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
