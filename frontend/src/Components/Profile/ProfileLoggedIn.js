import React from "react";
import { Button, Image } from "react-bootstrap";

const ProfileLoggedIn = (props) => {
    const navigateToAuthPage = () => {
        window.location.href = "/auth";
    };
    return (
        <>
            <div className="my-3">
                <div
                    className="container d-flex mt-5 mb-0 justify-content-center"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "#e6f3ff" : "#474b52",
                    }}
                >
                    <div className="col my-5 d-flex justify-content-center">
                        <Image
                            src={props.profileImg}
                            roundedCircle
                            className=""
                        />
                    </div>
                    <div className="col my-5 d-flex align-items-center justify-content-start">
                        <div
                            className={`text-${
                                props.mode === "dark" ? "light" : "dark"
                            }`}
                        >
                            <p style={{ fontSize: "2rem" }}>
                                Name: {props.userName}
                            </p>
                            <br />
                            <p style={{ fontSize: "1.5rem" }}>
                                Contact: {props.userContact}
                            </p>
                            <br />
                            <p style={{ fontSize: "1.5rem" }}>
                                Email: {props.userEmail}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="container d-flex mt-0 justify-content-center"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "#e6f3ff" : "#474b52",
                    }}
                >
                    <div className="col my-5 d-flex justify-content-center align-items-center">
                        <Button variant="success" className="btn h-50">
                            Update Profile
                        </Button>
                    </div>
                    <div className="col my-3 d-flex align-items-center justify-content-start">
                        <div>
                            <p
                                className={`w-75 my-0 text-${
                                    props.mode === "dark" ? "light" : "dark"
                                }`}
                                style={{ fontSize: "1.5rem" }}
                            >
                                Address: Ramrao Adik Institue of Technology, DY
                                Patil Deemed to be University, Nerul, Navi
                                Mumbai, Maharashtra, 400706
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
                    <div className="d-grid gap-4 col-6 justify-content-center">
                        <Button
                            variant={
                                props.mode === "dark" ? "light" : "primary"
                            }
                            className="btn-lg mt-3"
                        >
                            Account Settings
                        </Button>
                        <Button
                            variant={
                                props.mode === "dark" ? "light" : "primary"
                            }
                            className="btn-lg"
                        >
                            Notification
                        </Button>
                        <Button
                            variant={
                                props.mode === "dark" ? "light" : "primary"
                            }
                            className="btn-lg"
                        >
                            Security
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
                            onClick={navigateToAuthPage}
                        >
                            Sign Out
                        </Button>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <h2 className="">
                            <span
                                className={`badge text-dark bg-${
                                    props.mode === "dark" ? "warning" : "info"
                                }`}
                            >
                                {props.userBadge}
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileLoggedIn;
