import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar2 = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <nav
                className={`navbar navbar-expand-lg sticky-top border-bottom border-${
                    props.mode === "light" ? "" : "secondary"
                }`}
                style={
                    props.mode === "light"
                        ? { backgroundColor: "#fff" }
                        : { backgroundColor: "#36393e" }
                }
            >
                <div className="container d-flex justify-content-between">
                    <div className="w-25">
                        <Link className="navbar-brand p-0 w-50" to="/home">
                            <img
                                src={`../Images/calendara_${props.mode}.png`}
                                className="img-fluid"
                                alt=""
                            />
                        </Link>
                    </div>

                        <Link
                            to="/auth"
                            className={`nav-link hover-navlink text-${
                                props.mode === "light" ? "black" : "white"
                            } mx-2 hover-underline`}
                        >
                            Login/Signup
                        </Link>

                        <div className="d-flex align-items-center">
                            <input
                                className="form-check-input invisible"
                                onClick={props.toggleMode}
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                            />
                            <label
                                className="d-flex mx-3 align-items-center"
                                style={{ fontSize: "1.50rem" }}
                            >
                                <input
                                    type="checkbox"
                                    onClick={props.toggleMode}
                                    style={{ display: "none" }}
                                />
                                <div className="container d-flex align-items-center">
                                    {props.mode === "light" ? (
                                        <i
                                            className="bi bi-sun icon-shadow-yellow"
                                            style={{ color: "black" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="bi bi-moon icon-shadow-white"
                                            style={{ color: "white" }}
                                        ></i>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>
            </nav>
        </>
    );
};

export default Navbar2;
