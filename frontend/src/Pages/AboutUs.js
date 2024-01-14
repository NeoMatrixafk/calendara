import React from "react";

const AboutUs = (props) => {
    return (
        <>
            <div
                className={`container my-5 text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                <h1>About Us</h1>
                <h4 className="my-3">Meet the team:</h4>
                <ul>
                    <li>
                        Ayush Sharma
                        <div className="my-3">
                            <button
                                className={`btn me-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.github.com/ayush-sharma11"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-github" />
                                </a>
                            </button>
                            <button
                                className={`btn mx-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.linkedin.com/in/ayush-sharma3121/"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-linkedin" />
                                </a>
                            </button>
                            <button
                                className={`btn ms-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.instagram.com/ahhyoushhh"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-instagram" />
                                </a>
                            </button>
                        </div>
                    </li>
                    <li>
                        Austin Kurian
                        <div className="my-3">
                            <button
                                className={`btn me-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.github.com/NeoMatrixafk"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-github" />
                                </a>
                            </button>
                            <button
                                className={`btn mx-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.linkedin.com/in/austink1/"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-linkedin" />
                                </a>
                            </button>
                            <button
                                className={`btn ms-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.instagram.com/_austin.kurian_"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-instagram" />
                                </a>
                            </button>
                        </div>
                    </li>
                    <li>
                        Rishiveer Reddy Gudibandi
                        <div className="my-3">
                            <button
                                className={`btn me-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.github.com/Rishiveer-2003"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-github" />
                                </a>
                            </button>
                            <button
                                className={`btn mx-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.linkedin.com"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-linkedin" />
                                </a>
                            </button>
                            <button
                                className={`btn ms-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://www.linkedin.com/in/rishiveer-reddy-gudibandi-5248b6213"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-instagram" />
                                </a>
                            </button>
                        </div>
                    </li>
                    <li>
                        Sanjivanee Jadhav
                        <div className="my-3">
                            <button
                                className={`btn me-2 btn-${
                                    props.mode === "light" ? "dark" : "light"
                                }`}
                            >
                                <a
                                    href="https://github.com/Sanjivanee-9"
                                    style={{
                                        textDecoration: "none",
                                        color:
                                            props.mode === "light"
                                                ? "white"
                                                : "black",
                                    }}
                                >
                                    <i className="bi bi-github" />
                                </a>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default AboutUs;
