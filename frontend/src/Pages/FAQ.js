import React from "react";

const FAQ = (props) => {
    return (
        <div className="container my-5">
            <h1
                className={`text-${props.mode === "light" ? "black" : "white"}`}
            >
                FAQs
            </h1>
        </div>
    );
};

export default FAQ;
