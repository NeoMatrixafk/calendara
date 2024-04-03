import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HomeAdImage from "../HomeCommon/HomeAdImage";

const HomeAd = (props) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const animatedRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        setIsIntersecting(true);
                        entry.target.classList.add("animate");
                    } else {
                        setIsIntersecting(false);
                        entry.target.classList.remove("animate");
                    }
                });
            },
            // Options for the observer
            {
                root: null,
            }
        );

        observer.observe(animatedRef.current);

        // Cleanup observer when component unmounts
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={animatedRef}
            className={`box container my-5 d-flex justify-content-center home-calendar animated ${
                isIntersecting ? "animate slideInFromBottom" : ""
            }`}
            style={{ minHeight: "100vh" }}
        >
            <div className="row">
                <div className="col-lg-6 col-md-12 my-3 d-flex justify-content-center align-items-center">
                    <HomeAdImage mode={props.mode} />
                </div>
                <div className="col-lg-6 col-md-12 my-3 d-flex justify-content-center align-items-center">
                    <div
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        <p style={{ fontSize: "1.75rem" }} className="mb-4">
                            calendara
                        </p>
                        <p style={{ fontSize: "2.5rem" }}>
                            Your one stop destination
                        </p>
                        <p style={{ fontSize: "1.25rem" }}>
                            For all your events and their rightful, timely and
                            reliable tracking and management
                        </p>
                        <div className="mt-3">
                            <Link
                                to="/faq"
                                className={`btn btn-${
                                    props.mode === "light"
                                        ? "primary"
                                        : "danger"
                                } btn-lg`}
                                style={{
                                    borderRadius: "1.5rem",
                                    paddingLeft: "1rem",
                                    paddingRight: "1rem",
                                }}
                            >
                                See how
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAd;
