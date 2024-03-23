import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = (props) => {
    const navigate = useNavigate();

    const [messageLength, setMessageLength] = useState(0); // State to store the message length
    const maxLength = 150; // Set the maximum allowed length for the message

    const [data, setData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:55555/api/contactus";

        try {
            await axios.post(url, data);
            window.alert("Form Submitted");
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Could not accept query!");
            } else {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <div className="d-flex my-4 justify-content-center">
                <h1
                    className={`text-${
                        props.mode === "dark" ? "light" : "dark"
                    }`}
                >
                    Contact Us
                </h1>
            </div>
            <div className="container">
                <section className="mb-4">
                    <p
                        className={`text-${
                            props.mode === "dark" ? "light" : "dark"
                        } text-center w-responsive mx-auto mb-5`}
                        style={{ fontSize: "1.5rem" }}
                    >
                        Do you have any questions?
                        <br />
                        Please do not hesitate to contact us.
                        <br />
                        Our team will come back to you as soon as possible!
                    </p>
                    <div className="row d-flex my-4 justify-content-around">
                        <form
                            id="contact-form"
                            name="contact-form"
                            onSubmit={handleSubmit}
                            className="col-8 w-50"
                        >
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control my-3"
                                placeholder="Your name"
                                value={data.name}
                                onChange={handleChange}
                                style={{
                                    backgroundColor:
                                        props.mode === "dark"
                                            ? "#4d4d4d"
                                            : "white",
                                    WebkitTextFillColor:
                                        props.mode === "dark" ? "#BEBEBE" : "",
                                }}
                                required
                            />

                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control my-3"
                                placeholder="Your email"
                                value={data.email}
                                onChange={handleChange}
                                style={{
                                    backgroundColor:
                                        props.mode === "dark"
                                            ? "#4d4d4d"
                                            : "white",
                                    WebkitTextFillColor:
                                        props.mode === "dark" ? "#BEBEBE" : "",
                                }}
                                required
                            />

                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="form-control my-3"
                                placeholder="Subject"
                                value={data.subject}
                                onChange={handleChange}
                                style={{
                                    backgroundColor:
                                        props.mode === "dark"
                                            ? "#4d4d4d"
                                            : "white",
                                    WebkitTextFillColor:
                                        props.mode === "dark" ? "#BEBEBE" : "",
                                }}
                                required
                                autoComplete="off"
                            />
                            <div style={{ position: "relative" }}>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="2"
                                    className="form-control md-textarea"
                                    placeholder="Your message"
                                    value={data.message}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setMessageLength(e.target.value.length);
                                    }}
                                    style={{
                                        backgroundColor:
                                            props.mode === "dark"
                                                ? "#4d4d4d"
                                                : "white",
                                        WebkitTextFillColor:
                                            props.mode === "dark"
                                                ? "#BEBEBE"
                                                : "",
                                        minHeight: "5rem",
                                        maxHeight: "10rem",
                                        position: "relative",
                                        padding: "0.5rem",
                                        boxSizing: "border-box",
                                    }}
                                    maxLength={maxLength}
                                    autoComplete="off"
                                    required
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "0.5rem",
                                        right: "0.5rem",
                                        fontSize: "0.8rem",
                                        color:
                                            props.mode === "dark"
                                                ? "#BEBEBE"
                                                : "#333",
                                    }}
                                >
                                    {messageLength}/{maxLength}
                                </div>
                            </div>
                            <button
                                className={`btn btn-${
                                    props.mode === "light"
                                        ? "primary"
                                        : "success"
                                } mt-3`}
                            >
                                Send
                            </button>
                        </form>

                        <div className="col-3 text-center my-3">
                            <ul
                                className={`list-unstyled text-${
                                    props.mode === "dark" ? "light" : "dark"
                                } mb-0`}
                            >
                                <li>
                                    <p>
                                        Ramrao Adik Institue of Technology, DY
                                        Patil Deemed to be University, Nerul,
                                        Navi Mumbai, Maharashtra, 400706
                                    </p>
                                </li>

                                <li>
                                    <p>+91 8454960695</p>
                                </li>

                                <li>
                                    <a
                                        href="mailto:user@example.com"
                                        style={{ textDecoration: "none" }}
                                        className={`text-${
                                            props.mode === "light"
                                                ? "primary"
                                                : "danger"
                                        }`}
                                    >
                                        contact.calendara@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <br />
            <div className="container my-4">
                <h4
                    className={`text-${
                        props.mode === "dark" ? "light" : "dark"
                    }`}
                    style={{ marginLeft: "1.1rem" }}
                >
                    Or contact/follow us on social media
                </h4>
                <section className="mb-4 my-3">
                    <a
                        className={`btn btn-${
                            props.mode === "dark" ? "dark" : "success"
                        } btn-floating m-1 mx-3 btn-shadow-${
                            props.mode === "dark" ? "white" : "green"
                        }`}
                        href="https://www.facebook.com/"
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-facebook"></i>
                    </a>

                    <a
                        className={`btn btn-${
                            props.mode === "dark" ? "dark" : "success"
                        } btn-floating m-1 mx-3 btn-shadow-${
                            props.mode === "dark" ? "white" : "green"
                        }`}
                        href="https://www.whatsapp.com/"
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-whatsapp"></i>
                    </a>

                    <a
                        className={`btn btn-${
                            props.mode === "dark" ? "dark" : "success"
                        } btn-floating m-1 mx-3 btn-shadow-${
                            props.mode === "dark" ? "white" : "green"
                        }`}
                        href="https://www.instagram.com/"
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>

                    <a
                        className={`btn btn-${
                            props.mode === "dark" ? "dark" : "success"
                        } btn-floating m-1 mx-3 btn-shadow-${
                            props.mode === "dark" ? "white" : "green"
                        }`}
                        href="https://www.twitter.com/"
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-twitter-x"></i>
                    </a>

                    <a
                        className={`btn btn-${
                            props.mode === "dark" ? "dark" : "success"
                        } btn-floating m-1 mx-3 btn-shadow-${
                            props.mode === "dark" ? "white" : "green"
                        }`}
                        href="https://www.linkedin.com/"
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-linkedin"></i>
                    </a>

                    <a
                        className={`btn btn-${
                            props.mode === "dark" ? "dark" : "success"
                        } btn-floating m-1 mx-3 btn-shadow-${
                            props.mode === "dark" ? "white" : "green"
                        }`}
                        href="https://www.discord.com/"
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-discord"></i>
                    </a>
                </section>
            </div>
        </>
    );
};

export default Contact;
