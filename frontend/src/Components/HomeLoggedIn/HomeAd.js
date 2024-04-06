import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import HomeAdImage from "../HomeCommon/HomeAdImage";

const HomeAd = (props) => {
    const [refLeft, inViewLeft] = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    const [refRight, inViewRight] = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", marginTop: "5rem" }}
        >
            <div className="row">
                <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
                    <div
                        ref={refLeft}
                        className={`container home d-flex justify-content-center animated ${
                            inViewLeft ? "animate-left" : ""
                        }`}
                    >
                        <HomeAdImage mode={props.mode} />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
                    <div
                        ref={refRight}
                        className={`container home animated ${
                            inViewRight ? "animate-right" : ""
                        }`}
                    >
                        <p
                            className={`my-0 text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                            style={{ fontSize: "1.75rem" }}
                        >
                            calendara
                        </p>
                        <p
                            className={`my-0 text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                            style={{ fontSize: "2.5rem" }}
                        >
                            Your one stop destination
                        </p>
                        <p
                            className={`text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                            style={{ fontSize: "1.25rem" }}
                        >
                            For all your events and their rightful, timely and
                            reliable tracking and management
                        </p>
                        <div>
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
