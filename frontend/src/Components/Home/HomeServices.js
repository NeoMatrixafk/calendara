import React from "react";

const HomeServices = (props) => {
    return (
        <>
            <div className="container">
                <div
                    className={`container d-flex justify-content-center text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    <div className="row">
                        <div className="col-12">
                            <p
                                className="fw-bold"
                                style={{ fontSize: "2.5rem" }}
                            >
                                Our Services
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center">
                    <div className="row">
                        <div className="col-6">
                            <div
                                className="card my-4 border-secondary"
                                style={{ width: "25rem", overflow: "auto" }}
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(2).webp"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div
                                    className="card-body"
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "white"
                                                : "#4E5259",
                                    }}
                                >
                                    <p
                                        className={`card-text text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
                                        }`}
                                    >
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                </div>
                            </div>
                            <div
                                className="card my-4 border-secondary"
                                style={{ width: "25rem", overflow: "auto" }}
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(2).webp"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div
                                    className="card-body"
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "white"
                                                : "#4E5259",
                                    }}
                                >
                                    <p
                                        className={`card-text text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
                                        }`}
                                    >
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className="card my-4 border-secondary"
                                style={{ width: "25rem", overflow: "auto" }}
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(2).webp"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div
                                    className="card-body"
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "white"
                                                : "#4E5259",
                                    }}
                                >
                                    <p
                                        className={`card-text text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
                                        }`}
                                    >
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                </div>
                            </div>
                            <div
                                className="card my-4 border-secondary"
                                style={{ width: "25rem", overflow: "auto" }}
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(2).webp"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div
                                    className="card-body"
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "white"
                                                : "#4E5259",
                                    }}
                                >
                                    <p
                                        className={`card-text text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
                                        }`}
                                    >
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeServices;
