import React from "react";
import HomeAccordian from "./HomeAccordian";

const HomeFAQ = (props) => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
                    <div
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        <p className="fw-bold" style={{ fontSize: "2.5rem" }}>
                            Built just for you!
                        </p>
                        <p>
                            We at calendara are here just to make your event
                            tracking and management as easy just clicking a few
                            buttons.
                        </p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <HomeAccordian mode={props.mode} />
                </div>
            </div>
        </div>
    );
};

export default HomeFAQ;
