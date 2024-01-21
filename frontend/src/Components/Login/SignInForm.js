import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const SignInForm = (props) => {

    const [viewPassword, setViewPassword] = useState(true);

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    const showAlert = () => alert("This feature will be added shortly.");

    const [data, setData] = useState({
        email: "",
        contact: "",
        password: "",
    });

    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || ""
    );
    const [email, setEmail] = useState(localStorage.getItem("email") || "");

    const [contact, setContact] = useState(
        localStorage.getItem("contact") || ""
    );

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    useEffect(() => {
        //This function gets user data to display on profile page.

        const fetchData = async () => {
            try {
                const nameURL = `http://localhost:55555/api/getData/${data.email}`;
                const response = await axios.get(nameURL);
                setUserName(response.data.name);
                setContact(response.data.contact);
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        if (data.email && data.contact) {
            fetchData();
        }
    }, [data.email, data.contact, setContact, setUserName]);

    const handleSubmit = async (e) => {
        // This function runs when Login button is clicked on.

        e.preventDefault();

        const url = "http://localhost:55555/api/auth";

        try {
            const { data: res } = await axios.post(url, data);
            const nameURL = `http://localhost:55555/api/getData/${data.email}`;
            const response = await axios.get(nameURL);

            setUserName(response.data.name);
            setEmail(data.email);
            setContact(response.data.contact);
            console.log(userName);
            console.log(email);
            console.log(contact);

            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("contact", response.data.contact);
            localStorage.setItem("token", res.data);

            window.alert(`Welcome ${response.data.name || data.email}!`);
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Invalid Email!");
            } else if (error.response && error.response.status === 402) {
                alert("Invalid Password!");
            }else {
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
                            onClick={showAlert}
                        >
                            <i className="bi bi-google"></i>
                        </Button>
                        <Button
                            className={`icon mx-1 text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                            onClick={showAlert}
                        >
                            <i className="bi bi-facebook"></i>
                        </Button>
                        <Button
                            className={`icon mx-1 text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                            onClick={showAlert}
                        >
                            <i className="bi bi-microsoft"></i>
                        </Button>
                        <Button
                            className={`icon mx-1 text-${
                                props.mode === "light" ? "white" : "black"
                            } btn btn-${
                                props.mode === "light" ? "primary" : "light"
                            }`}
                            onClick={showAlert}
                        >
                            <i className="bi bi-apple"></i>
                        </Button>
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
                        className={`text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                        onClick={showAlert}
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
