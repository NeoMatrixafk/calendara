// ToggleContainer.js
import React from "react";

const ToggleContainer = () => {
    return (
        <>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Log in to use all of site features</p>
                        <button className="hidden" id="login">
                            Log In
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, User!</h1>
                        <p>Register to use all of site features</p>
                        <button className="hidden" id="register">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToggleContainer;
