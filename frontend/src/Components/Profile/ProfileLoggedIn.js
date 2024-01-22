import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfileLoggedIn = (props) => {
    const [userName] = useState(localStorage.getItem("userName") || "");
    const [contact] = useState(localStorage.getItem("contact") || "");
    const [email] = useState(localStorage.getItem("email") || "");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("contact");
        localStorage.removeItem("email");
        localStorage.removeItem("userProfileImage");
        localStorage.removeItem("userBGImage");

        window.location.reload();
    };

    const defaultBackgroundImage = `/Images/Logo/calendara_${props.mode}.png`;

    return (
        <>
            <div className="my-3">
                <div className="shadow">
                    <div
                        className="container d-flex mt-5 mb-0 justify-content-center"
                        style={{
                            backgroundImage: `url(${
                                localStorage.getItem("userBGImage") ||
                                defaultBackgroundImage
                            })`,
                            height: "20rem",
                        }}
                    >
                        <div className="col my-5 d-flex justify-content-center">
                            <div
                                className="container"
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
                                            className="img-fluid"
                                            alt="user profile pic"
                                            style={{
                                                width: "14rem",
                                                borderRadius: "7rem",
                                            }}
                                        />
                                    </div>

                                    <div className="col-12 mt-4 d-flex justify-content-center">
                                        <div className="col-12 mt-4 d-flex justify-content-center">
                                            <Link
                                                to="update-profile"
                                                className="btn btn-lg btn-success"
                                            >
                                                Update Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col my-5 d-flex align-items-center justify-content-start">
                            <div
                                className={`text-${
                                    props.mode === "dark" ? "light" : "dark"
                                }`}
                                style={{ marginTop: "43rem" }}
                            >
                                <p
                                    className="montserrat-regular-400"
                                    style={{ fontSize: "2.5rem" }}
                                >
                                    Name: {userName}
                                </p>
                                <br />
                                <p
                                    className="montserrat-regular-400"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Contact: {contact}
                                </p>
                                <br />
                                <p
                                    className="montserrat-regular-400"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Email: {email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="container d-flex py-3 justify-content-center"
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "#e6f3ff" : "#474b52",
                        }}
                    >
                        <br />
                    </div>
                    <div
                        className="container d-flex mt-0 align-items-center justify-content-center"
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "#e6f3ff" : "#474b52",
                        }}
                    >
                        <div
                            className="d-grid gap-4 col-6 justify-content-center"
                            style={{ marginTop: "15rem" }}
                        >
                            <Link
                                to="/profile/upload-events"
                                className={`btn btn-lg mt-3 btn-${
                                    props.mode === "light" ? "primary" : "light"
                                }`}
                            >
                                Upload Data
                            </Link>
                            <Button
                                variant={
                                    props.mode === "dark" ? "light" : "primary"
                                }
                                className="btn-lg"
                            >
                                Account Settings
                            </Button>
                            <Button
                                variant={
                                    props.mode === "dark" ? "light" : "primary"
                                }
                                className="btn-lg"
                            >
                                Notifications
                            </Button>
                            <Button
                                variant={
                                    props.mode === "dark" ? "light" : "primary"
                                }
                                className="btn-lg"
                            >
                                More
                            </Button>
                            <Button
                                className="btn btn-lg btn-danger mb-5"
                                onClick={handleLogout}
                            >
                                Sign Out
                            </Button>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className="container">
                                <div
                                    className="row mx-0 rounded w-75"
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "#b3daff"
                                                : "#5f646d",
                                        marginTop: "20rem",
                                    }}
                                >
                                    <div className="col-12 mt-3">
                                        <p
                                            className={`text-${
                                                props.mode === "light"
                                                    ? "black"
                                                    : "white"
                                            }`}
                                            style={{ fontSize: "1.5rem" }}
                                        >
                                            Events Completed: 5
                                        </p>
                                    </div>
                                    <div className="col-12">
                                        <p
                                            className={`text-${
                                                props.mode === "light"
                                                    ? "black"
                                                    : "white"
                                            }`}
                                            style={{ fontSize: "1.5rem" }}
                                        >
                                            Events Not Completed: 2
                                        </p>
                                    </div>
                                    <hr />
                                    <div className="col-12 mb-3 d-flex justify-content-center">
                                        <Link
                                            to="/dashboard"
                                            className={`text-${
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
            </div>
        </>
    );
};

export default ProfileLoggedIn;
