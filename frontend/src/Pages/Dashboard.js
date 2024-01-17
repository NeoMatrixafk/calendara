import React from "react";

import Activity from "../Components/Dashboard/Activity";
import CompletedEvents from "../Components/Dashboard/CompletedEvents";
import NotCompletedEvents from "../Components/Dashboard/NotCompletedEvents";
import UpcomingEvents from "../Components/Dashboard/UpcomingEvents";

const Dashboard = (props) => {
    return (
        <>
            <div className="container my-5">
                <h1
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    User Dashboard Analysis
                </h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-3 d-flex justify-content-center">
                        <Activity mode={props.mode} />
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <CompletedEvents mode={props.mode} />
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <NotCompletedEvents mode={props.mode} />
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <UpcomingEvents mode={props.mode} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
