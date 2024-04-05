import React from "react";

const MoreSettings = ({ mode }) => {
    return (
        <>
            <div className="container my-5">
                <h1 className={`text-${mode === "light" ? "black" : "white"}`}>
                    More Settings
                </h1>
                <div className="my-5">
                    <h3
                        className={`text-${
                            mode === "light" ? "black" : "white"
                        }`}
                    >
                        Request Data Download
                    </h3>
                    <div className="my-5">
                        <p
                            className={`text-${
                                mode === "light" ? "black" : "white"
                            }`}
                        >
                            Want to request to download your data us?
                        </p>
                        <p
                            className={`text-${
                                mode === "light" ? "black" : "white"
                            }`}
                        >
                            Enter your details below to send a request to
                            download your data.
                        </p>
                        <div className="container input-field w-50">
                            <div className="my-3">
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
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div className="input-group my-3">
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
                                    placeholder="Enter Your Password"
                                />
                                <button
                                    className={`btn btn-${
                                        mode === "light" ? "primary" : "warning"
                                    }`}
                                >
                                    Request Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoreSettings;
