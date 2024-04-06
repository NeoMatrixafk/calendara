import { useInView } from "react-intersection-observer";
import HomeAccordian from "./HomeAccordian";

const HomeFAQ = (props) => {
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    return (
        <div
            ref={ref}
            className={`container home d-flex align-items-center animated ${
                inView ? "animate slideInFromBottom" : ""
            }`}
            style={{
                height: "50vh",
                marginTop: "10rem",
                marginBottom: "10rem",
            }}
        >
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-4 col-md-6 text-center">
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
