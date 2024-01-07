import React from "react";

import HomeServicesCard from "./HomeServicesCard";

const HomeServices = (props) => {
    const servicesTexts = {
        service1: {
            text: "This is our first service",
            imgUrl: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(1).webp",
        },
        service2: {
            text: "This is our second service",
            imgUrl: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(2).webp",
        },
        service3: {
            text: "This is our third service",
            imgUrl: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(3).webp",
        },
        service4: {
            text: "This is our fourth service",
            imgUrl: "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(4).webp",
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
                                service={servicesTexts.service2}
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
