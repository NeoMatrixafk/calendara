import React from "react";

const HomeMain = (props) => {
    console.log(props.mode);
    return (
        <>
            <div className="container row">
                <p
                    className={`mt-5 fw-bold d-flex justify-content-center col-12}`}
                    style={{
                        fontSize: "4.5rem",
                        color: props.mode === "light" ? "black" : "white",
                    }}
                >
                    Events made easy!
                </p>
                <p
                    className={`d-flex justify-content-center text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                    style={{ fontSize: "1.5rem" }}
                >
                    All the tools you need to track your events in one place!
                </p>
            </div>

            <div className="container d-flex justify-content-center my-5">
                <img src="../Images/Home/home-pic1.png" alt="" />
            </div>
        </>
    );
};

export default HomeMain;
