import { useEffect, useState, useRef } from "react";
import "../HomeCommon/HomeAnimation.css";
import HomeCalendarImage from "../HomeCommon/HomeCalendarImage";

const HomeMain = (props) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const animatedRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    entry.target.classList.add("animate");
                } else {
                    setIsIntersecting(false);
                    entry.target.classList.remove("animate");
                }
            });
        });

        observer.observe(animatedRef.current);

        // Cleanup observer when component unmounts
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div
                className="container home-title-animation"
                style={{ minHeight: "78vh" }}
            >
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <p
                            className="fw-bold text-center montserrat-regular-400 home-main-headline"
                            style={{
                                fontSize: "5rem",
                                color:
                                    props.mode === "light" ? "black" : "white",
                            }}
                        >
                            Events made easy!
                        </p>
                        <p
                            className={`text-center montserrat-regular-400 text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                            style={{ fontSize: "2rem" }}
                        >
                            All the tools you need to track your events in one
                            place!
                        </p>
                    </div>
                </div>
            </div>

            <div
                ref={animatedRef}
                className={`box container d-flex justify-content-center home-calendar animated ${
                    isIntersecting ? "animate" : ""
                }`}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <HomeCalendarImage mode={props.mode} />
                        </div>
                        <div className="col-md-6 col-12 d-flex align-items-center">
                            <p
                                className={`home-main-p text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                style={{
                                    textAlign: "center",
                                    fontSize: "2.5rem",
                                }}
                            >
                                Hey there! Welcome to calendara - your one stop
                                event-tracking and event-management destination!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeMain;
