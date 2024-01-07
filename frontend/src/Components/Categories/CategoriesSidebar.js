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
                        <button className="btn btn-primary w-75 my-2">
                            category1
                        </button>
                        <button className="btn btn-secondary w-75 my-2">
                            category2
                        </button>
                        <button className="btn btn-success w-75 my-2">
                            category3
                        </button>
                        <button className="btn btn-danger w-75 my-2">
                            category4
                        </button>
                        <button className="btn btn-warning w-75 my-2">
                            category5
                        </button>
                        <button className="btn btn-info w-75 my-2">
                            category6
                        </button>
                        <button className="btn btn-light w-75 my-2 border">
                            category7
                        </button>
                        <button className="btn btn-dark w-75 my-2">
                            category8
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriesSidebar;
