import React from "react";

import HomeServicesCard from "./HomeServicesCard";

const HomeServices = (props) => {
    const servicesTexts = {
        service1: {
            text: "This is our first service",
            imgUrl: "../Images/calendarOverview.png",
        },
        service2: {
            text: "This is our second service",
            imgUrl: "../Images/crud.png",
        },
        service3: {
            text: "calendara's new dashboard feature empowers users with insightful metrics, providing a comprehensive overview of their event management journey. The dashboard succinctly displays the number of completed events, showcasing the user's accomplishments and successful engagements. Additionally, it highlights the count of pending or uncompleted events, serving as a helpful reminder to stay organized and on top of upcoming responsibilities. This user-centric dashboard not only offers a visual snapshot of past achievements but also serves as a dynamic tool for planning and prioritizing future tasks. By presenting a clear and concise summary, Calendara's dashboard enhances users' event tracking experience, fostering a proactive and organized approach to their schedules.",
            imgUrl: "../Images/dashboard.png",
        },
        service4: {
            text: "This is our fourth service",
            imgUrl: "../Images/eventReminders.png",
        },
    };
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
                            <HomeServicesCard
                                mode={props.mode}
                                service={servicesTexts.service1}
                            />
                            <HomeServicesCard
                                mode={props.mode}
                                service={servicesTexts.service3}
                            />
                        </div>
                        <div className="col-6">
                            <HomeServicesCard
                                mode={props.mode}
                                service={servicesTexts.service2}
                            />
                            <HomeServicesCard
                                mode={props.mode}
                                service={servicesTexts.service4}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeServices;
