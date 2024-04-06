import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const AccountSettings = ({ mode }) => {
    
    const [isEnabled, setIsEnabled] = useState(localStorage.getItem("isEnabled") === "true");
    const username = localStorage.getItem("userName");
    const email = localStorage.getItem("email");
    const intervalRef = useRef(null); // Reference to store the interval ID

    useEffect(() => {
        const sendMail = async () => {
            try {
                const response = await fetch(`http://localhost:55555/api/sendmail/${username}/${email}`);
                if (!response.ok) {
                    throw new Error("Failed to send email");
                }
            } catch (error) {
                console.error("Error sending email:", error);
            }
        };

        const handleInterval = () => {
            if (isEnabled) {
                sendMail(); // Send initial email when enabling
                intervalRef.current = setInterval(sendMail, 1000); // Send emails periodically
            } else {
                clearInterval(intervalRef.current); // Clear interval when disabling
            }
        };

        handleInterval(); // Call handleInterval isEnabled changes

    }, [isEnabled, username, email]);

    useEffect(() => {
        if (!isEnabled) {
            clearInterval(intervalRef.current);
        }
    }, [isEnabled]);
    
    const toggleIsEnabled = () => {
        const newIsEnabled = !isEnabled;
        setIsEnabled(newIsEnabled);
        localStorage.setItem("isEnabled", newIsEnabled);
    };
    
    return (
        <>
            <div className="container my-5">
                <h1 className={`text-${mode === "light" ? "black" : "white"}`}>
                    Account Settings
                </h1>
            </div>
            <div className="container">
                <div className="my-5">
                    <h3>
                        <Link
                            to="/profile/update-profile"
                            className={`text-${
                                mode === "light" ? "primary" : "danger"
                            }`}
                            style={{ textDecoration: "none" }}
                        >
                            Update Profile
                        </Link>
                    </h3>
                </div>
                <div className="my-5">
                    <h3>
                        <div>
                            <p
                                className={`text-${
                                    mode === "light" ? "black" : "white"
                                }`}
                            >
                                {isEnabled ? "Disable" : "Enable"} email notifications
                            </p>

                            <button
                                type="button"
                                onClick={toggleIsEnabled}
                                className={`btn btn-${
                                    mode === "light" ? "dark" : "light"
                                }`}
                            >
                                {isEnabled ? "Disable" : "Enable"}
                            </button>
                        </div>
                    </h3>
                </div>
                <div className="my-5">
                    <h3
                        className={`text-${
                            mode === "light" ? "black" : "white"
                        }`}
                    >
                        Update Password
                    </h3>
                    <div className="container my-5">
                        <div className="container mt-3 input-field w-50">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${
                                        mode === "light"
                                            ? ""
                                            : "border-secondary"
                                    }`}
                                    style={{
                                        backgroundColor:
                                            mode === "light" ? "" : "#4d4d4d",
                                        WebkitTextFillColor:
                                            mode === "light" ? "" : "#e6e6e6",
                                    }}
                                    placeholder="Enter Current Password"
                                />
                                <div className="input-group mt-3">
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            mode === "light"
                                                ? ""
                                                : "border-secondary"
                                        }`}
                                        style={{
                                            backgroundColor:
                                                mode === "light"
                                                    ? ""
                                                    : "#4d4d4d",
                                            WebkitTextFillColor:
                                                mode === "light"
                                                    ? ""
                                                    : "#e6e6e6",
                                        }}
                                        placeholder="Enter New Password"
                                    />
                                    <button
                                        className={`btn btn-${
                                            mode === "light"
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
                </div>
                <div className="my-5">
                    <h3
                        className={`text-${
                            mode === "light" ? "black" : "white"
                        }`}
                    >
                        Delete Account
                    </h3>
                    <div className="my-5">
                        <p
                            className={`text-${
                                mode === "light" ? "black" : "white"
                            }`}
                        >
                            Are you sure you want to delete your account? This
                            action is irreversible and will result in the
                            permanent loss of your account data, including
                            profile information, event history, and settings.
                            Please consider the following before proceeding:
                            <ul>
                                <li>
                                    You will no longer have access to your
                                    account.
                                </li>
                                <li>
                                    Your account information cannot be recovered
                                    once deleted.
                                </li>
                                <li>
                                    You will have to make a new account to get
                                    access to the site features again.
                                </li>
                            </ul>
                            If you are certain about deleting your account,
                            please enter your password below and click "Confirm
                            Delete."
                        </p>
                    </div>
                    <div className="container input-field w-50">
                        <div className="input-group mt-3">
                            <input
                                type="text"
                                className={`form-control ${
                                    mode === "light" ? "" : "border-secondary"
                                }`}
                                style={{
                                    backgroundColor:
                                        mode === "light" ? "" : "#4d4d4d",
                                    WebkitTextFillColor:
                                        mode === "light" ? "" : "#e6e6e6",
                                }}
                                placeholder="Enter Your Password"
                            />
                            <button
                                className={`btn btn-${
                                    mode === "light" ? "primary" : "warning"
                                }`}
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountSettings;
