import React from "react";
import { Link } from "react-router-dom";

const HomeAd = (props) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 my-3 d-flex justify-content-center align-items-center">
                        <img
                            src="../Images/Home/home-rating.png"
                            alt=""
                            className="h-75"
                        />
                    </div>
                    <div className="col-6 my-3 d-flex justify-content-start">
                        <div
                            className={`container text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            <div className="row">
                                <div className="col-12">
                                    <h3
                                        style={{
                                            marginTop: "4rem",
                                            marginBottom: "auto",
                                        }}
                                    >
                                        calendara
                                    </h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <p
                                        className="my-3 fw-bold"
                                        style={{ fontSize: "2.5rem" }}
                                    >
                                        Your one stop destination
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <p>
                                        For all your events and their rightful,
                                        timely and reliable tracking and
                                        management
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8 mt-3">
                                    <Link
                                        to={"/faq"}
                                        className={`btn btn-${
                                            props.mode === "light"
                                                ? "primary"
                                                : "danger"
                                        } btn-lg`}
                                        style={{
                                            borderRadius: "1.5rem",
                                            paddingLeft: "1rem",
                                            paddingRight: "1rem",
                                        }}
                                    >
                                        See how
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeAd;
