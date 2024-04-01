import React from "react";
import "./HomeAnimation.css";

const HomeMain = (props) => {
    console.log(props.mode);
    return (
        <>
            <div className="container row home-title-animation">
                <p
                    className="mt-5 fw-bold d-flex justify-content-center col-12 montserrat-regular-400"
                    style={{
                        fontSize: "4.5rem",
                        color: props.mode === "light" ? "black" : "white",
                    }}
                >
                    Events made easy!
                </p>
                <p
                    className={`d-flex justify-content-center montserrat-regular-400 text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                    style={{ fontSize: "1.5rem" }}
                >
                    All the tools you need to track your events in one place!
                </p>
            </div>

            <div
                className="container d-flex justify-content-center my-5"
                style={{ width: "75%" }}
            >
                <img
                    src="../Images/Home/home-pic1.png"
                    alt=""
                    style={{ maxWidth: "100%" }}
                />
            </div>
        </>
    );
};

export default HomeMain;
