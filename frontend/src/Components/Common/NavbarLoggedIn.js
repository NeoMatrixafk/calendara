import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";

const NavbarLoggedIn = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        localStorage.removeItem("contact");
        window.location.pathname = "/";
    };

    const navigate = useNavigate();

    return (
        <>
            <nav
                className={`navbar navbar-expand-lg sticky-top border-bottom border-${
                    props.mode === "light" ? "" : "secondary"
                } shadow`}
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
                                src={`/Images/Logo/calendara_${props.mode}.png`}
                                // do not add .. before /Images -> it is causing error in UpdateEvent
                                className="img-fluid"
                                alt=""
                                onError={(e) =>
                                    console.error("Image failed to load", e)
                                }
                            />
                        </Link>
                    </div>

                    <div className="d-flex align-items-center">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link
                                    className={`nav-link hover-underline text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ fontSize: "1.10rem" }}
                                    to="/home"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link
                                    className={`nav-link hover-underline text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ fontSize: "1.10rem" }}
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link
                                    className={`nav-link hover-underline text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ fontSize: "1.10rem" }}
                                    to="/categories"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li className="nav-item mx-2 d-flex align-items-center">
                                <Dropdown
                                    show={showCalendarDropdown}
                                    onMouseEnter={() =>
                                        setShowCalendarDropdown(true)
                                    }
                                    onMouseLeave={() =>
                                        setShowCalendarDropdown(false)
                                    }
                                >
                                    <Dropdown.Toggle
                                        id="profile-dropdown"
                                        className={`nav-link hover-navlink text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
                                        } mx-2`}
                                        style={{
                                            background: "transparent",
                                            borderColor: "transparent",
                                            letterSpacing: "0.10rem",
                                            height: "3rem",
                                            fontSize: "1.10rem",
                                        }}
                                        onClick={() => {
                                            navigate("/events");
                                        }}
                                    >
                                        Calendar
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu
                                        style={{
                                            backgroundColor:
                                                props.mode === "light"
                                                    ? ""
                                                    : "#36393e",
                                        }}
                                    >
                                        <Dropdown.Item
                                            onClick={() => {
                                                setShowCalendarDropdown(false);
                                                navigate("/add-event");
                                            }}
                                            className={`dropdown-hover-${
                                                props.mode
                                            } text-${
                                                props.mode === "light"
                                                    ? "black"
                                                    : "white"
                                            }`}
                                            style={{
                                                background: "transparent",
                                            }}
                                        >
                                            Add Event
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setShowCalendarDropdown(false);
                                                navigate("/events");
                                            }}
                                            className={`dropdown-hover-${
                                                props.mode
                                            } text-${
                                                props.mode === "light"
                                                    ? "black"
                                                    : "white"
                                            }`}
                                            style={{
                                                background: "transparent",
                                            }}
                                        >
                                            Calendar
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center">
                        <div>
                            <Link
                                className={`nav-link hover-navlink text-${
                                    props.mode === "light" ? "black" : "white"
                                } mx-2 hover-underline`}
                                onClick={handleShow}
                            >
                                Search
                            </Link>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                size="lg"
                                className="mt-5"
                            >
                                <Modal.Header
                                    closeVariant={
                                        props.mode === "dark"
                                            ? "white"
                                            : "black"
                                    }
                                    closeButton
                                    className={
                                        props.mode === "light"
                                            ? ""
                                            : "border-secondary"
                                    }
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "white"
                                                : "#36393e",
                                    }}
                                >
                                    <Modal.Title className="w-75">
                                        <div className="input-group input-group-lg">
                                            <span
                                                className="input-group-text"
                                                style={{
                                                    backgroundColor:
                                                        props.mode === "light"
                                                            ? "white"
                                                            : "#666B74",
                                                    WebkitTextFillColor:
                                                        props.mode === "light"
                                                            ? ""
                                                            : "white",
                                                }}
                                            >
                                                <i className="bi bi-search"></i>{" "}
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="What are you looking for..."
                                                aria-label="Search"
                                                style={{
                                                    backgroundColor:
                                                        props.mode === "light"
                                                            ? "white"
                                                            : "#666B74",
                                                    WebkitTextFillColor:
                                                        props.mode === "light"
                                                            ? ""
                                                            : "#e6e6e6",
                                                }}
                                            />
                                        </div>
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "white"
                                                : "#36393e",
                                    }}
                                >
                                    <div style={{ height: "50vh" }}></div>
                                </Modal.Body>

                                <Modal.Footer
                                    className={
                                        props.mode === "light"
                                            ? ""
                                            : "border-secondary"
                                    }
                                    style={{
                                        backgroundColor:
                                            props.mode === "light"
                                                ? "white"
                                                : "#36393e",
                                    }}
                                >
                                    <p
                                        className={`text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
                                        }`}
                                    >
                                        calendara
                                    </p>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        <Dropdown
                            show={showProfileDropdown}
                            onMouseEnter={() => setShowProfileDropdown(true)}
                            onMouseLeave={() => setShowProfileDropdown(false)}
                        >
                            <Dropdown.Toggle
                                id="profile-dropdown"
                                className={`nav-link hover-navlink text-${
                                    props.mode === "light" ? "black" : "white"
                                } mx-2`}
                                style={{
                                    background: "transparent",
                                    borderColor: "transparent",
                                    letterSpacing: "0.10rem",
                                    height: "3rem",
                                }}
                                onClick={() => {
                                    navigate("/profile");
                                }}
                            >
                                <img
                                    src={
                                        localStorage.getItem(
                                            "userProfileImage"
                                        ) || "Images/Misc/defaultProfile.jpg"
                                    }
                                    alt="user profile"
                                    style={{
                                        width: "3rem",
                                        borderRadius: "1.5rem",
                                    }}
                                    className="me-1"
                                />
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                style={{
                                    backgroundColor:
                                        props.mode === "light" ? "" : "#36393e",
                                }}
                            >
                                <Dropdown.Item
                                    onClick={() => {
                                        setShowProfileDropdown(false);
                                        navigate("/profile");
                                    }}
                                    className={`dropdown-hover-${
                                        props.mode
                                    } text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{
                                        background: "transparent",
                                    }}
                                >
                                    View Profile
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setShowProfileDropdown(false);
                                        navigate("/profile/update-profile");
                                    }}
                                    className={`dropdown-hover-${
                                        props.mode
                                    } text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{
                                        background: "transparent",
                                    }}
                                >
                                    Update Profile
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={handleLogout}
                                    className={`dropdown-hover-${
                                        props.mode
                                    } text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ background: "transparent" }}
                                >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

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
                                    id="toggle-mode"
                                    name="toggle-mode-checkbox"
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
                </div>
            </nav>
        </>
    );
};

export default NavbarLoggedIn;
