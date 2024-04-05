import "../HomeCommon/HomeAnimation.css";

const HomeMain = (props) => {
    return (
        <>
            <div
                className="container home-title-animation"
                style={{ minHeight: "90vh" }}
            >
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <p
                            className="fw-bold text-center montserrat-regular-400 home-main-headline"
                            style={{
                                fontSize: "4.5rem",
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
        </>
    );
};

export default HomeMain;
