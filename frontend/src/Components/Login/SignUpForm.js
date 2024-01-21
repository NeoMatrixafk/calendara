import React, { useState } from "react"; //imports
import { Button } from "react-bootstrap";

import axios from "axios";

const SignUpForm = (props) => {
    const [data, setData] = useState({
        name: "",
        contact: "",
        email: "",
        password: "",
    });

    const [viewPassword, setViewPassword] = useState(true);

    const [contact, setContact] = useState(
        localStorage.getItem("contact") || ""
    );

    const showAlert = () => alert("This feature will be added shortly.");

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    const handleChange = ({ currentTarget: input }) => {

        setData({ ...data, [input.name]: input.value });

    };

    const handleSubmit = async (e) => {     // This function runs when Register button is clicked on.

        e.preventDefault();

        const url = "http://localhost:55555/api/users";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(data.email);
        
        if (!isValidEmail) {
            alert("Enter a valid email!");
            console.error('Invalid email format. Must contain "@" and at least one dot.');
            return;
    }

    if (data.contact.length !== 10) {
        alert("Contact must contain exactly 10 numbers!")
        return;
    }

        try {
            const { data: res } = await axios.post(url, data);

            setContact(data.contact);
            console.log(contact)

            localStorage.setItem("contact", data.contact);

            window.alert(`Account created successfully for ${data.name}.`);
            window.location.reload();

            console.log(res.message);
        } catch (error) {
            
            if (error.response && error.response.status === 408) {
                alert("Contact already exists!");
            } else if (error.response && error.response.status === 409) {
                alert("Email already exists!");
            } else if (error.response && error.response.status === 400) {
                alert(
                    "Password should contain: \n  Minimum 8 characters. \n  1 number, 1 symbol and 1 uppercase letter."
                );
            } else {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <div className="form-container sign-up">
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
                        <b>Create Account</b>
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
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={handleChange}
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "" : "gray",
                            WebkitTextFillColor:
                                props.mode === "light" ? "black" : "white",
                        }}
                        required
                    />

                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        placeholder="Contact"
                        value={data.contact}
                        onChange={handleChange}
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "" : "gray",
                            WebkitTextFillColor:
                                props.mode === "light" ? "black" : "white",
                        }}
                        required
                    />

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

                    <button
                        className={`btn btn-${
                            props.mode === "light" ? "primary" : "danger"
                        } mt-3`}
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignUpForm;
