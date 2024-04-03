import { useEffect, useRef, useState } from "react";
import HomeAccordian from "./HomeAccordian";

const HomeFAQ = (props) => {
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
            className={`container my-5 home animated ${
                isIntersecting ? "animate slideInFromBottom" : ""
            }`}
            style={{ height: "40vh" }}
        >
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-center">
                    <div
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        <p className="" style={{ fontSize: "2.5rem" }}>
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
