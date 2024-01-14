import React from "react";

const AboutSite = (props) => {
    return (
        <>
            <div
                className={`container my-5 text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                <h3 className="my-3">Resources we have used:</h3>
                <a
                    href="https://icons8.com/icon/12776/calendar"
                    className="ms-1"
                >
                    Calendar
                </a>{" "}
                icon by <a href="https://icons8.com">Icons8</a>
            </div>
        </>
    );
};

export default AboutSite;
