import React from "react";

import HomeServicesCard from "./HomeServicesCard";

const HomeServices = (props) => {
    const servicesTexts = {
        service1: {
            text: "calendara, with its user-friendly interface, is crafted for simplicity and ease of use. The site's well-organized structure, marked by a clean design, facilitates a seamless experience for users. Our calendar is designed to be user friendly and intuitive.",
            imgUrl: "../Images/Home/calendarOverview.png",
        },
        service2: {
            text: "calendara simplifies event management with easy-to-use CRUD operations. Users can swiftly create new events, update details as plans evolve, and delete events when they're no longer relevant. This streamlined process ensures users have the flexibility and control they need for efficient and dynamic event tracking.",
            imgUrl: "../Images/Home/crud.png",
        },
        service3: {
            text: "calendara's new dashboard feature empowers users with insightful metrics, providing a comprehensive overview of their event management journey. The dashboard succinctly displays the number of completed events, not-completed events and an analysis upon the same.",
            imgUrl: "../Images/Home/dashboard.png",
        },
        service4: {
            text: "calendara enhances user productivity with its thoughtful event reminding feature. As an event approaches, calendara takes the initiative to send timely and helpful email reminders to users, ensuring they stay on top of their schedules. This proactive approach eliminates the risk of overlooking important commitments and adds an extra layer of convenience to the overall event management experience.",
            imgUrl: "../Images/Home/eventReminders.png",
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
