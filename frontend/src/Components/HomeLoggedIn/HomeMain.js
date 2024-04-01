import React from "react";
import "./HomeAnimation.css";

const HomeMain = (props) => {
    console.log(props.mode);
    return (
        <>
            <div className="container home-title-animation">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
                        <p
                            className="mt-5 fw-bold text-center montserrat-regular-400 home-main-headline"
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
                            style={{ fontSize: "1.5rem" }}
                        >
                            All the tools you need to track your events in one
                            place!
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="container d-flex justify-content-center my-5"
                style={{ width: "75%" }}
            >
                <img
                    src="../Images/Home/home-pic1.png"
                    alt=""
                    style={{ maxWidth: "150%" }}
                />
            </div>
        </>
    );
};

export default HomeMain;
