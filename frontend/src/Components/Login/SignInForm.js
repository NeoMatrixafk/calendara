import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ErrorToast from "./ErrorToast";

import axios from "axios";

const SignInForm = (props) => {
    const navigate = useNavigate(); // Initialize useHistory hook
    const [showToast, setShowToast] = useState(false);

    const [viewPassword, setViewPassword] = useState(true);

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    const toggleToast = () => setShowToast(!showToast);

    const [data, setData] = useState({
        email: "",
        contact: "",
        password: "",
    });

    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || ""
    ); // State to store the user's name
    const [email, setEmail] = useState(localStorage.getItem("email") || "");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const nameURL = `http://localhost:55555/api/getData/${data.email}`;
                const response = await axios.get(nameURL);
                setUserName(response.data.name);
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        if (data.email) {
            fetchUserName();
        }
    }, [data.email]); // Fetch user name when email changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:55555/api/auth";
        try {
            const { data: res } = await axios.post(url, data);
            const nameURL = `http://localhost:55555/api/getData/${data.email}`;
            const response = await axios.get(nameURL);

            setUserName(response.data.name);
            setEmail(data.email);

            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("token", res.data);

            window.alert(`Welcome ${response.data.name || data.email}!`);
            navigate("/");
        } catch (error) {
            // Handle invalid email or password
            if (error.response && error.response.status === 401) {
                alert("Invalid Email and Password!");
            } else {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <div className="form-container sign-in">
                <form
                    onSubmit={handleSubmit}
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
                        <Button
                            className={`icon mx-1 text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                            onClick={toggleToast}
                        >
                            <i className="bi bi-google"></i>
                        </Button>
                        <Button
                            className={`icon mx-1 text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                            onClick={toggleToast}
                        >
                            <i className="bi bi-facebook"></i>
                        </Button>
                        <Button
                            className={`icon mx-1 text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                            onClick={toggleToast}
                        >
                            <i className="bi bi-microsoft"></i>
                        </Button>
                        <Button
                            className={`icon mx-1 text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                            onClick={toggleToast}
                        >
                            <i className="bi bi-apple"></i>
                        </Button>

                        <ErrorToast
                            showToast={showToast}
                            toggleToast={toggleToast}
                            mode={props.mode}
                        />
                    </div>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "" : "gray",
                            WebkitTextFillColor:
                                props.mode === "light" ? "black" : "white",
                        }}
                        required
                    />

                    <div className="input-group w-100">
                        <input
                            type={viewPassword ? "password" : "text"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "gray",
                                WebkitTextFillColor:
                                    props.mode === "light" ? "black" : "white",
                            }}
                            required
                        />
                        <button
                            type="button"
                            className={`btn my-2 py-0 btn-${
                                props.mode === "light" ? "primary" : "dark"
                            }`}
                            onClick={() => toggleViewPassword()}
                        >
                            <i
                                className={`bi bi-eye${
                                    viewPassword ? "-slash" : ""
                                }`}
                                style={{
                                    color: "white",
                                }}
                            ></i>
                        </button>
                    </div>

                    <Link
                        to="#"
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
