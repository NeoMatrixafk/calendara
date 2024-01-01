import React from "react";

const CategoriesMainContent = (props) => {
    return (
        <>
            <div className="categories-main ps-3">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    The content will be displayed accordingly
                </h3>
            </div>
        </>
    );
};

export default CategoriesMainContent;
