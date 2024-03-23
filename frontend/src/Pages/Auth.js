import React, { useEffect } from "react";

import SignUpForm from "../Components/Login/SignUpForm";
import SignInForm from "../Components/Login/SignInForm";
import ToggleContainer from "../Components/Login/ToggleContainer";

import { Link } from "react-router-dom";

import "../Auth.css";

const Auth = (props) => {
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
            <nav
                className="navbar navbar-expand-lg sticky-top"
                style={
                    props.mode === "light"
                        ? { backgroundColor: "#fff" }
                        : { backgroundColor: "#36393e" }
                }
            >
                <div className="container d-flex justify-content-center">
                    <div className="w-25">
                        <Link className="navbar-brand p-0 w-50" to="/">
                            <img
                                src={`../Images/Logo/calendara_${props.mode}.png`}
                                className="img-fluid"
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            </nav>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <div className="">
                    <div className="login-container" id="login-container">
                        <SignUpForm mode={props.mode} />
                        <SignInForm mode={props.mode} />
                        <ToggleContainer mode={props.mode} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
