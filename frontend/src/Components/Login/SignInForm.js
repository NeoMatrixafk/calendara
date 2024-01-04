import React from "react";
import { Link } from "react-router-dom";

const SignInForm = (props) => {
    return (
        <>
            <div className="form-container sign-in">
                <form
                    action="/login"
                    method="post"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "#fff" : "#36393e",
                    }}
                >
                    <h1
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        <b>Log In</b>
                    </h1>
                    <div className="social-icons">
                        <Link
                            to="/login"
                            className={`icon text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                        >
                            <i className="bi bi-google"></i>
                        </Link>
                        <Link
                            to="/login"
                            className={`icon text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                        >
                            <i className="bi bi-facebook"></i>
                        </Link>
                        <Link
                            to="/login"
                            className={`icon text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                        >
                            <i className="bi bi-microsoft"></i>
                        </Link>
                        <Link
                            to="/login"
                            className={`icon text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                        >
                            <i className="bi bi-apple"></i>
                        </Link>
                    </div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "" : "gray",
                            WebkitTextFillColor:
                                props.mode === "light" ? "black" : "white",
                        }}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "" : "gray",
                            WebkitTextFillColor:
                                props.mode === "light" ? "black" : "white",
                        }}
                        required
                    />
                    <Link
                        to="/login"
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        Forgot Your Password?
                    </Link>
                    <button
                        className={`btn btn-${
                            props.mode === "light" ? "primary" : "danger"
                        } mt-3`}
                    >
                        Log In
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignInForm;
