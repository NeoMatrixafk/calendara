import React, { useEffect } from "react";

import SignUpForm from "../Components/Login/SignUpForm";
import SignInForm from "../Components/Login/SignInForm";
import ToggleContainer from "../Components/Login/ToggleContainer";

import "../Login.css";

const Login = () => {
    useEffect(() => {
        const login_container = document.getElementById("login-container");
        const registerBtn = document.getElementById("register");
        const loginBtn = document.getElementById("login");

        registerBtn.addEventListener("click", () => {
            login_container.classList.add("active");
        });

        loginBtn.addEventListener("click", () => {
            login_container.classList.remove("active");
        });

        // Cleanup event listeners on component unmount
        return () => {
            registerBtn.removeEventListener("click", () => {
                login_container.classList.add("active");
            });
            loginBtn.removeEventListener("click", () => {
                login_container.classList.remove("active");
            });
        };
    }, []); // Empty dependency array ensures that this effect runs only once after initial render

    return (
        <>
            <div className="d-flex justify-content-center my-5">
                <div className="login-container" id="login-container">
                    <SignUpForm />
                    <SignInForm />
                    <ToggleContainer />
                </div>
            </div>
        </>
    );
};

export default Login;
