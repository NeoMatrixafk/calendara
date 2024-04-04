import React from "react";

import ayush from "../Components/AboutUs/ayush.jpeg";
import austin from "../Components/AboutUs/austin.jpg";

const AboutUs = (props) => {
    return (
        <>
            <div
                className={`container my-5 text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                <h1 className="mb-5">About Us</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 d-flex justify-content-center">
                            <div className="about-img-div mb-5">
                                <img
                                    className="about-pics"
                                    src={ayush}
                                    alt=""
                                />
                                <p
                                    style={{ fontSize: "2rem" }}
                                    className="mt-3 d-flex justify-content-center"
                                >
                                    Ayush Sharma
                                </p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className={`btn me-2 btn-${
                                            props.mode === "light"
                                                ? "dark"
                                                : "light"
                                        }`}
                                    >
                                        <a
                                            href="https://www.github.com/ayush-sharma11"
                                            style={{
                                                textDecoration: "none",
                                                color:
                                                    props.mode === "light"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            <i className="bi bi-github" />
                                        </a>
                                    </button>
                                    <button
                                        className={`btn mx-2 btn-${
                                            props.mode === "light"
                                                ? "dark"
                                                : "light"
                                        }`}
                                    >
                                        <a
                                            href="https://www.linkedin.com/in/ayush-sharma3121/"
                                            style={{
                                                textDecoration: "none",
                                                color:
                                                    props.mode === "light"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            <i className="bi bi-linkedin" />
                                        </a>
                                    </button>
                                    <button
                                        className={`btn ms-2 btn-${
                                            props.mode === "light"
                                                ? "dark"
                                                : "light"
                                        }`}
                                    >
                                        <a
                                            href="https://www.instagram.com/ahhyoushhh"
                                            style={{
                                                textDecoration: "none",
                                                color:
                                                    props.mode === "light"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            <i className="bi bi-instagram" />
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 d-flex justify-content-center">
                            <div className="about-img-div mb-5">
                                <img
                                    className="about-pics"
                                    src={austin}
                                    alt=""
                                />
                                <p
                                    style={{ fontSize: "2rem" }}
                                    className="mt-3 d-flex justify-content-center"
                                >
                                    Austin Kurian
                                </p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className={`btn me-2 btn-${
                                            props.mode === "light"
                                                ? "dark"
                                                : "light"
                                        }`}
                                    >
                                        <a
                                            href="https://www.github.com/NeoMatrixafk"
                                            style={{
                                                textDecoration: "none",
                                                color:
                                                    props.mode === "light"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            <i className="bi bi-github" />
                                        </a>
                                    </button>
                                    <button
                                        className={`btn mx-2 btn-${
                                            props.mode === "light"
                                                ? "dark"
                                                : "light"
                                        }`}
                                    >
                                        <a
                                            href="https://www.linkedin.com/in/austink1/"
                                            style={{
                                                textDecoration: "none",
                                                color:
                                                    props.mode === "light"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            <i className="bi bi-linkedin" />
                                        </a>
                                    </button>
                                    <button
                                        className={`btn ms-2 btn-${
                                            props.mode === "light"
                                                ? "dark"
                                                : "light"
                                        }`}
                                    >
                                        <a
                                            href="https://www.instagram.com/_austin.kurian_"
                                            style={{
                                                textDecoration: "none",
                                                color:
                                                    props.mode === "light"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            <i className="bi bi-instagram" />
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
