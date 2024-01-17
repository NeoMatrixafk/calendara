import React from "react";

const UpcomingEvents = (props) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: "#ffc107",
                                color: "black",
                                height: "4rem",
                                width: "4rem",
                                borderRadius: "2rem",
                            }}
                        >
                            <i className="bi bi-clock"></i>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <p
                            className={`p-0 text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            Upcoming Events
                        </p>
                    </div>
                    <div
                        className="col-12 p-0 d-flex justify-content-center"
                        style={{ marginTop: "11rem" }}
                    >
                        upcoming events
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpcomingEvents;
