//React imports
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileLoggedIn = (props) => {

    //Hooks
    const navigate = useNavigate();

    //States
    const [userName] = useState(localStorage.getItem("userName") || "");
    const [contact] = useState(localStorage.getItem("contact") || "");
    const [email] = useState(localStorage.getItem("email") || "");
    // const [eventTitles1Day, setEventTitles1Day] = useState([]);
    const resolvedEventsCount = localStorage.getItem("resolvedEventsCount");
    const unresolvedEventsCount = localStorage.getItem("unresolvedEventsCount");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("contact");
        localStorage.removeItem("email");
        localStorage.removeItem("userProfileImage");
        localStorage.removeItem("userBGImage");
        localStorage.removeItem("completedEventsCount");
        localStorage.removeItem("categoryColor");
        localStorage.removeItem("overdueEventsCount");
        localStorage.removeItem("eventsCount");
        localStorage.removeItem("selectedColor");

        navigate("/");
    };

    const defaultBackgroundImage = `/Images/Logo/calendara_${props.mode}.png`;

    return (
        <div className="my-5">
            <div className="container shadow">
                <div
                    className="row user-bg"
                    style={{
                        backgroundImage: `url(${
                            localStorage.getItem("userBGImage") ||
                            defaultBackgroundImage
                        })`,
                        height: "20rem",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="col-md-6 col-12">
                        <div className="col my-5 d-flex justify-content-center">
                            <div
                                className="container user-pfp"
                                style={{ marginTop: "10rem" }}
                            >
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-center">
                                        <img
                                            src={
                                                localStorage.getItem(
                                                    "userProfileImage"
                                                ) || props.defaultProfileImg
                                            }
                                            className="img-fluid user-pfp-img"
                                            alt="user profile pic"
                                            style={{
                                                width: "14rem",
                                                borderRadius: "7rem",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-md-6 col-12 profile-empty-col">
                        {/* empty col - for proper arangement */}
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="">
                            <div
                                className={`text-${
                                    props.mode === "dark" ? "light" : "dark"
                                }`}
                            >
                                <p
                                    className="montserrat-regular-400 profile-username"
                                    style={{ fontSize: "2.5rem" }}
                                >
                                    Name: {userName}
                                </p>
                                <br />
                                <p
                                    className="montserrat-regular-400 profile-contact"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Contact: {contact}
                                </p>
                                <br />
                                <p
                                    className="montserrat-regular-400 profile-email"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Email: {email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row profile-row-padding py-5">
                    <div className="col-md-6 col-12">
                        <div className="d-grid gap-4 justify-content-center">
                            <Link
                                to="update-profile"
                                className="btn btn-lg btn-success profile-btn"
                            >
                                Update Profile
                            </Link>

                            <Link
                                to="/profile/upload-events"
                                className={`btn btn-lg mt-3 profile-btn btn-${
                                    props.mode === "light" ? "primary" : "light"
                                }`}
                            >
                                Upload Data
                            </Link>
                            <Link
                                to="/profile/account-settings"
                                className={`btn btn-lg profile-btn btn-${
                                    props.mode === "dark" ? "light" : "primary"
                                }
                                `}
                            >
                                Account Settings
                            </Link>
                            <Link
                                to="/profile/more-settings"
                                className={`btn btn-lg profile-btn btn-${
                                    props.mode === "dark" ? "light" : "primary"
                                }
                                `}
                            >
                                More Settings
                            </Link>
                            <button
                                className="btn btn-lg btn-danger profile-btn mb-5"
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div
                            className="px-3 py-2 mx-0 rounded profile-analysis w-75"
                            style={{
                                backgroundColor:
                                    props.mode === "light"
                                        ? "#b3daff"
                                        : "#5f646d",
                            }}
                        >
                            <div className="col-12 mt-3">
                                <p
                                    className={`profile-dashboard text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ fontSize: "1.5rem" }}
                                >
                                    Activity - Current Month
                                </p>
                            </div>
                            <div className="col-12">
                                <p
                                    className={`profile-dashboard text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ fontSize: "1.5rem" }}
                                >
                                    Resolved Events: {resolvedEventsCount}
                                </p>
                            </div>
                            <div className="col-12">
                                <p
                                    className={`profile-dashboard text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ fontSize: "1.5rem" }}
                                >
                                    Unresolved Events: {unresolvedEventsCount}
                                </p>
                            </div>
                            <hr />
                            <div className="col-12 mb-3 d-flex justify-content-center">
                                <Link
                                    to="/dashboard"
                                    className={`profile-dashboard text-${
                                        props.mode === "light"
                                            ? "success"
                                            : "warning"
                                    }`}
                                    style={{
                                        fontSize: "1.5rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    View Full Analysis
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLoggedIn;
