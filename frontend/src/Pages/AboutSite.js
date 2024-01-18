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
                <a href="https://icons8.com/icon/12776/calendar">
                    Calendar
                </a>{" "}
                icon by <a href="https://icons8.com">Icons8</a>
                <br />
                <a href="https://www.vecteezy.com/free-vector/silhouette-profile-picture">
                    Silhouette Profile Picture Vectors by Vecteezy
                </a>
            </div>
        </>
    );
};

export default AboutSite;
