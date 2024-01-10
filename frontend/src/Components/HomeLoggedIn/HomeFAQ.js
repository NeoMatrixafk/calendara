import React from "react";

import HomeAccordian from "./HomeAccordian";

const HomeFAQ = (props) => {
    return (
        <>
            <div className="container my-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-4 d-flex justify-content-center">
                        <div
                            className={`container text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            <div className="row">
                                <div className="col-12">
                                    <p
                                        className="fw-bold"
                                        style={{ fontSize: "2.5rem" }}
                                    >
                                        Built just for you!
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-9">
                                    <p>
                                        We at calendara are here just to make
                                        your event tracking and management as
                                        easy just clicking a few buttons.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <HomeAccordian mode={props.mode} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeFAQ;
