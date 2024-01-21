import React from "react";

import categoryColors from "./categoryColors";

const CategoriesSidebar = (props) => {
    // const categoryColor = localStorage.getItem("categoryColor");

    localStorage.setItem("categoryColor", "#ff5722");
    // console.log(categoryColor);

    return (
        <>
            <div className="categories-side">
                <div className="container">
                    <div className="container p-0">
                        <h3
                            className={`mb-2 text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            Categories
                        </h3>
                    </div>
                    <div className="row d-flex justify-content-center mt-3 mb-5">
                        {Object.keys(categoryColors).map((category, index) => {
                            const colorValue = categoryColors[category];

                            if (colorValue !== 0) {
                                return (
                                    <button
                                        key={index}
                                        className="btn w-75 my-2"
                                        style={{
                                            backgroundColor: category,
                                            color:
                                                props.mode === "light"
                                                    ? "black"
                                                    : "white",
                                        }}
                                    >
                                        {colorValue}
                                    </button>
                                );
                            }

                            return null; // To satisfy the map function requirement of returning a value
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriesSidebar;
