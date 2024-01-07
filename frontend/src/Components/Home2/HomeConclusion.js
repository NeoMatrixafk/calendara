import React from "react";
import { Link } from "react-router-dom";

const HomeConclusion = (props) => {
    return (
        <>
            <div className="container my-5">
                <div
                    className={`container d-flex justify-content-center text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    <div className="row">
                        <div className="col-12">
                            <p className="fw-bold" style={{ fontSize: "3rem" }}>
                                So why wait? Join us now!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <Link
                                to="/auth"
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
                                Join Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeConclusion;
