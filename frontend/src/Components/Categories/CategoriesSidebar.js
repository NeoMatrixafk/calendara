import React from "react";

const CategoriesSidebar = (props) => {
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
                        <button
                            className="btn w-75 my-2"
                            style={{ backgroundColor: "#999" }}
                        >
                            category1
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriesSidebar;
