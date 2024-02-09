import React, { useState} from "react";

import categoryColors from "./categoryColors";

const CategoriesSidebar = (props) => {

    const [selectedColor, setSelectedColor] = useState(() => {
        
        return localStorage.getItem("selectedColor") || "#ffeb3b";
    });
    localStorage.setItem("selectedColor", selectedColor);

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
                        {categoryColors.map((colorValue, index) => {
                            if (colorValue !== 0) {
                                return (
                                    <button
                                        key={index}
                                        className="btn w-75 my-2"
                                        style={{
                                            backgroundColor: colorValue,
                                            color:
                                                props.mode === "light"
                                                    ? "black"
                                                    : "white",
                                        }}
                                        onClick={() =>
                                            setSelectedColor(colorValue)
                                        }
                                    >
                                        {colorValue}
                                    </button>
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriesSidebar;
