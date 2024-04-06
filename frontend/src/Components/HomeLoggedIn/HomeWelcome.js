import { useInView } from "react-intersection-observer";
import HomeCalendarImage from "../HomeCommon/HomeCalendarImage";

const HomeWelcome = (props) => {
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    return (
        <>
            <div
                ref={ref}
                className={`box container d-flex justify-content-center animated ${
                    inView ? "animate" : ""
                }`}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 d-flex align-items-center">
                            <p
                                className={`home-main-p text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                style={{
                                    textAlign: "center",
                                    fontSize: "2rem",
                                }}
                            >
                                Hey there! Welcome to calendara - your one stop
                                event-tracking and event-management destination!
                            </p>
                        </div>
                        <div className="col-md-6 col-12">
                            <HomeCalendarImage mode={props.mode} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeWelcome;
