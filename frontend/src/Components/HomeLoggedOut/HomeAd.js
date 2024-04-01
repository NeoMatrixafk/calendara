import React from "react";
import { Link } from "react-router-dom";

const HomeAd = (props) => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6 col-md-12 my-3 d-flex justify-content-center align-items-center">
                    <img
                        src="../Images/Home/home-rating.png"
                        alt=""
                        className="img-fluid"
                    />
                </div>
                <div className="col-lg-6 col-md-12 my-3 d-flex justify-content-center align-items-center">
                    <div
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        <h3 className="mb-4">calendara</h3>
                        <p className="fw-bold" style={{ fontSize: "2.5rem" }}>
                            Your one stop destination
                        </p>
                        <p>
                            For all your events and their rightful, timely and
                            reliable tracking and management
                        </p>
                        <div className="mt-3">
                            <Link
                                to="/faq"
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
    );
};

export default HomeAd;
