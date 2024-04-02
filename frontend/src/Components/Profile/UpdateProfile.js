//React imports
import React, { useState } from "react";
import axios from "axios";

const UpdateProfile = (props) => {
    //States
    const [profileImageData, setProfileImageData] = useState("");
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [successProfileMesage, setSuccessProfileMesage] = useState(null);

    const [backgroundImageData, setBackgroundImageData] = useState("");
    const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
    const [backgroundSuccessMessage, setBackgroundSuccessMessage] =
        useState(null);

    const [newUserContact, setNewUserContact] = useState("");

    //Handling functions
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const profileData = reader.result;
                setProfileImageData(profileData);
                localStorage.setItem("userProfileImage", profileData);
                setProfileImagePreview(profileData); // Set image preview
            };

            reader.readAsDataURL(file);
        }
    };

    const storeProfileImage = async () => {
        if (profileImageData) {
            const email = localStorage.getItem("email");
            const deleteurl = `http://localhost:55555/api/profilepic/${email}`;
            await axios.delete(deleteurl);

            try {
                const url = "http://localhost:55555/api/profilepic";

                const email = localStorage.getItem("email");
                const imageData = localStorage.getItem("userProfileImage");

                const profileData = {
                    email: email,
                    imageData: imageData,
                };

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
        } else {
            alert("Please upload an image!");
        }
    };

    const handleBackgroundImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const backgroundData = reader.result;
                setBackgroundImageData(backgroundData);
                localStorage.setItem("userBGImage", backgroundData);
                setBackgroundImagePreview(backgroundData); // Set image preview
            };

            reader.readAsDataURL(file);
        }
    };

    const storeBackgroundImage = async () => {
        if (backgroundImageData) {
            const email = localStorage.getItem("email");
            const deleteurl = `http://localhost:55555/api/profilebgpic/${email}`;
            await axios.delete(deleteurl);

            try {
                const url = "http://localhost:55555/api/profilebgpic";

                const email = localStorage.getItem("email");
                const bgimageData = localStorage.getItem("userBGImage");

                const profileData = {
                    email: email,
                    bgimageData: bgimageData,
                };
                const response = await axios.post(url, profileData);
                console.log(profileData);

                if (response.data.success) {
                    setBackgroundSuccessMessage("Image successfully updated!");
                } else {
                    console.error("Failed to update image");
                }
            } catch (error) {
                console.error("Error updating image:", error);
            }
        } else {
            alert("Please upload an image!");
        }
    };

    const updateUserContact = async () => {
        try {
            const contact = localStorage.getItem("contact");
            const url = `http://localhost:55555/api/updatedata/updateusercontact/${contact}`;

            const response = await axios.put(url, {
                newUserContact: newUserContact,
            });

            if (response.status === 200) {
                console.log("UserContact updated successfully");
                window.alert("UserContact Updated Successfully!");
                localStorage.setItem("contact", newUserContact);
                window.location.reload();
                // Handle success
            }
        } catch (error) {
            console.error("Error updating email:", error);
            // Handle error
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
                <div className="container mt-3 input-field w-50">
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
                            required
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
                <div className="container mt-3 input-field w-50">
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
                            required
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
                <div className="container mt-3 input-field w-50">
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
                <div className="container mt-3 input-field w-50">
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
                            value={newUserContact}
                            onChange={(e) => setNewUserContact(e.target.value)}
                            placeholder="New Contact Number"
                        />
                        <button
                            className={`btn btn-${
                                props.mode === "light" ? "primary" : "warning"
                            }`}
                            onClick={updateUserContact}
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
                <div className="container mt-3 input-field w-50">
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
        </>
    );
};

export default UpdateProfile;
