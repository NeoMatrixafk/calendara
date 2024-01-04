// ToggleContainer.js
import React from "react";

const ToggleContainer = (props) => {
    return (
        <>
            <div className="toggle-container">
                <div
                    className="toggle"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "#fff" : "#474b52",
                    }}
                >
                    <div className="toggle-panel toggle-left">
                        <h1>
                            <b>Welcome Back!</b>
                        </h1>
                        <p>Log in to use all of site features</p>
                        <button
                            className={`btn btn-${
                                props.mode === "light" ? "warning" : "danger"
                            } mt-3`}
                            id="login"
                        >
                            Log In
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>
                            <b>Hello, User!</b>
                        </h1>
                        <p>Register to use all of site features</p>
                        <button
                            className={`btn btn-${
                                props.mode === "light" ? "warning" : "danger"
                            } mt-3`}
                            id="register"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToggleContainer;
