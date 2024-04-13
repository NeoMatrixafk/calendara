//React imports
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import { auth } from "../Login/firebase";

const NavbarLoggedIn = (props) => {
    //Hooks
    const navigate = useNavigate();

    //States
    const [show, setShow] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [events7daysCount, setEvents7daysCount] = useState(0);
    const [events3daysCount, setEvents3daysCount] = useState(0);
    const [events1dayCount, setEvents1dayCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    //Handling Functions
    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:55555/api/events/${email}`
            );
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }, [email]);

    const filterEventsByTitle = useCallback(() => {
        const filtered = events.filter(
            (event) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEvents(filtered);
    }, [searchQuery, events]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    useEffect(() => {
        filterEventsByTitle();
    }, [searchQuery, events, filterEventsByTitle]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClose = () => {
        setShow(false);
        setSearchQuery(""); // Reset search query when modal is closed
    };

    const handleShow = () => {
        setShow(true);
        fetchEvents(); // Fetch events again when modal is shown
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem("auth");
            console.log("User signed out successfully");
            navigate("/");
            // Perform any additional actions after sign out if needed
        } catch (error) {
            console.error("Error signing out:", error);
            // Display an appropriate error message to the user
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        handleSignOut();
        localStorage.removeItem("userName");
        localStorage.removeItem("contact");
        localStorage.removeItem("email");
        localStorage.removeItem("userProfileImage");
        localStorage.removeItem("userBGImage");
        localStorage.removeItem("resolvedEventsCount");
        localStorage.removeItem("categoryColor");
        localStorage.removeItem("unresolvedEventsCount");
        localStorage.removeItem("selectedColor");
        localStorage.removeItem("isEnabled");
        navigate("/");
    };

    const handleEventClick = (eventId) => {
        const clickedEvent = filteredEvents.find(
            (event) => event._id === eventId
        );
        navigate(`/event/${eventId}/update`, {
            state: { selectedEvent: clickedEvent, selectedEventId: eventId },
        });
        setShow(false);
    };

    useEffect(() => {
        async function fetch7daysEventsCount() {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/reminders/7days/${email}`
                );
                setEvents7daysCount(response.data.length || 0);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetch7daysEventsCount();
        const interval = setInterval(fetch7daysEventsCount, 1000); // Fetch every 1 sec
        return () => clearInterval(interval); // Cleanup
    }, [email]);

    useEffect(() => {
        async function fetch3daysEventsCount() {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/reminders/3days/${email}`
                );
                setEvents3daysCount(response.data.length || 0);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetch3daysEventsCount();
        const interval = setInterval(fetch3daysEventsCount, 1000); // Fetch every 1 sec
        return () => clearInterval(interval); // Cleanup
    }, [email]);

    useEffect(() => {
        async function fetch1dayEventsCount() {
            try {
                const response = await axios.get(
                    `http://localhost:55555/api/reminders/1day/${email}`
                );
                setEvents1dayCount(response.data.length || 0);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetch1dayEventsCount();
        const interval = setInterval(fetch1dayEventsCount, 1000); // Fetch every 1 sec
        return () => clearInterval(interval); // Cleanup
    }, [email]);

    useEffect(() => {
        const totalCount =
            events7daysCount + events3daysCount + events1dayCount;
        setTotalCount(totalCount);
        const interval = setInterval(setTotalCount(totalCount), 1000); // Fetch every 1 sec
        return () => clearInterval(interval); // Cleanup
    }, [events7daysCount, events3daysCount, events1dayCount]);

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 991) {
                setShowOffcanvas(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <nav
                className={`navbar navbar-expand-lg sticky-top border-bottom border-${
                    props.mode === "light" ? "" : "secondary"
                } shadow`}
                style={{
                    width: "100%",
                    backgroundColor:
                        props.mode === "light" ? "#fff" : "#36393e",
                }}
            >
                <div className="container-fluid">
                    <div className="container d-flex justify-content-between">
                        <div className="navbar-brand d-flex align-items-center p-0 m-0 justify-content-center w-25">
                            <Link className="p-0" to="/home">
                                <img
                                    src={`/Images/Logo/calendara_${props.mode}.png`}
                                    className="img-fluid"
                                    style={{
                                        maxWidth: "100%",
                                        minWidth: "5rem",
                                        height: "auto",
                                    }}
                                    alt=""
                                    onError={(e) =>
                                        console.error("Image failed to load", e)
                                    }
                                />
                            </Link>
                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => setShowOffcanvas(!showOffcanvas)}
                            style={{
                                color:
                                    props.mode === "light" ? "gray" : "white",
                                border: "none",
                            }}
                        >
                            <span
                                className="navbar-toggler-icon"
                                style={{
                                    filter:
                                        props.mode === "light"
                                            ? "invert(0)"
                                            : "invert(1)",
                                    color:
                                        props.mode === "light"
                                            ? "gray"
                                            : "white",
                                }}
                            ></span>
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                            style={{ marginRight: "auto" }}
                        >
                            <ul
                                className="navbar-nav me-auto mb-2 mb-lg-0"
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
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
                                <li className="nav-item dropdown mx-2 d-flex align-items-center">
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
                                                navigate("/events2");
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
                                                    setShowCalendarDropdown(
                                                        false
                                                    );
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
                                                    setShowCalendarDropdown(
                                                        false
                                                    );
                                                    navigate("/events2");
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

                                <li
                                    className="navbar-search"
                                    style={{ marginLeft: "5rem" }}
                                >
                                    <Link
                                        className={`nav-link hover-navlink text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
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
                                                                props.mode ===
                                                                "light"
                                                                    ? "white"
                                                                    : "#666B74",
                                                            WebkitTextFillColor:
                                                                props.mode ===
                                                                "light"
                                                                    ? ""
                                                                    : "white",
                                                        }}
                                                    >
                                                        <i className="bi bi-search"></i>{" "}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search by Event Title or Status..."
                                                        value={searchQuery}
                                                        onChange={
                                                            handleSearchChange
                                                        }
                                                        aria-label="Search Event Title"
                                                        style={{
                                                            backgroundColor:
                                                                props.mode ===
                                                                "light"
                                                                    ? "white"
                                                                    : "#666B74",
                                                            WebkitTextFillColor:
                                                                props.mode ===
                                                                "light"
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
                                                height: "25rem",
                                                overflowY: "auto",
                                            }}
                                        >
                                            {searchQuery !== "" ? (
                                                filteredEvents.map((event) => (
                                                    <div
                                                        key={event._id}
                                                        className={`mt-2 mb-5 text-${
                                                            props.mode ===
                                                            "light"
                                                                ? "black"
                                                                : "white"
                                                        }`}
                                                        onClick={() =>
                                                            handleEventClick(
                                                                event._id
                                                            )
                                                        }
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <div
                                                                className="me-2"
                                                                style={{
                                                                    width: "1.25rem",
                                                                    height: "1.25rem",
                                                                    borderRadius:
                                                                        "50%",
                                                                    backgroundColor:
                                                                        event.color,
                                                                }}
                                                            ></div>
                                                            <h3 className="my-0">
                                                                {event.title}
                                                            </h3>
                                                        </div>
                                                        <p>
                                                            <strong>
                                                                Description:
                                                            </strong>{" "}
                                                            {event.describe}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Start:
                                                            </strong>{" "}
                                                            {new Date(
                                                                event.start
                                                            ).toLocaleString()}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                End:
                                                            </strong>{" "}
                                                            {new Date(
                                                                event.end
                                                            ).toLocaleString()}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Status:
                                                            </strong>{" "}
                                                            {event.status}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p
                                                    className={`text-${
                                                        props.mode === "light"
                                                            ? "black"
                                                            : "light"
                                                    }`}
                                                >
                                                    Enter a search query to find
                                                    events by title or status.
                                                </p>
                                            )}
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
                                </li>
                            </ul>

                            <div className="d-flex align-items-center">
                                <Link
                                    to="/reminders"
                                    className="me-4 position-relative"
                                    type="button"
                                >
                                    <i
                                        className={`bi bi-bell text-${
                                            props.mode === "light"
                                                ? "black"
                                                : "white"
                                        }`}
                                        style={{ fontSize: "1.5rem" }}
                                    ></i>
                                    <span
                                        className={`badge position-absolute text-bg-${
                                            props.mode === "light"
                                                ? "danger"
                                                : "warning"
                                        }`}
                                    >
                                        {totalCount}
                                    </span>
                                </Link>

                                <Dropdown
                                    show={showProfileDropdown}
                                    onMouseEnter={() =>
                                        setShowProfileDropdown(true)
                                    }
                                    onMouseLeave={() =>
                                        setShowProfileDropdown(false)
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
                                        }}
                                        onClick={() => {
                                            navigate("/profile");
                                        }}
                                    >
                                        <img
                                            src={
                                                localStorage.getItem(
                                                    "userProfileImage"
                                                ) ||
                                                "Images/Misc/defaultProfile.jpg"
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
                                                props.mode === "light"
                                                    ? ""
                                                    : "#36393e",
                                        }}
                                    >
                                        <Dropdown.Item
                                            onClick={() => {
                                                setShowProfileDropdown(false);
                                                setShowOffcanvas(false);
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
                                                setShowOffcanvas(false);
                                                navigate(
                                                    "/profile/update-profile"
                                                );
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
                                            style={{
                                                background: "transparent",
                                            }}
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
                    </div>
                </div>
            </nav>

            <div
                className={`offcanvas offcanvas-end ${
                    showOffcanvas ? "show" : ""
                }`}
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div
                    className="offcanvas-header"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "#fff" : "#36393e",
                    }}
                >
                    <h5
                        className={`offcanvas-title text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                        id="offcanvasExampleLabel"
                    >
                        Hey {userName}!
                    </h5>
                    <button
                        type="button"
                        className={`btn-close btn-close-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                        onClick={() => setShowOffcanvas(false)}
                    ></button>
                </div>
                <div
                    className="offcanvas-body pt-3"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "#fff" : "#36393e",
                    }}
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{ margin: "auto" }}>
                            <Dropdown
                                show={showProfileDropdown}
                                onMouseEnter={() =>
                                    setShowProfileDropdown(true)
                                }
                                onMouseLeave={() =>
                                    setShowProfileDropdown(false)
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
                                    }}
                                    onClick={() => {
                                        setShowProfileDropdown(
                                            !showProfileDropdown
                                        );
                                    }}
                                >
                                    <img
                                        src={
                                            localStorage.getItem(
                                                "userProfileImage"
                                            ) ||
                                            "Images/Misc/defaultProfile.jpg"
                                        }
                                        alt="user profile"
                                        style={{
                                            width: "5rem",
                                            borderRadius: "2.5rem",
                                        }}
                                        className="me-1"
                                    />
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
                                            setShowProfileDropdown(false);
                                            setShowOffcanvas(false);
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
                                            setShowOffcanvas(false);
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
                                        style={{
                                            background: "transparent",
                                        }}
                                    >
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                            <div className="nav-item d-flex justify-content-center me-3">
                                <input
                                    className="form-check-input invisible"
                                    onClick={props.toggleMode}
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                />
                                <label
                                    className="d-flex align-items-center"
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
                        </li>
                        <li className="nav-item d-flex justify-content-center me-3 mt-3">
                            <input
                                className="form-check-input invisible"
                                onClick={props.toggleMode}
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                            />
                            <label
                                className="d-flex align-items-center"
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
                        </li>

                        <li className="d-flex justify-content-center align-items-center">
                            <Link
                                to="/reminders"
                                className="me-4 position-relative"
                                type="button"
                            >
                                <i
                                    className={`bi bi-bell text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                    style={{ fontSize: "1.5rem" }}
                                ></i>
                                <span
                                    className={`badge position-absolute text-bg-${
                                        props.mode === "light"
                                            ? "danger"
                                            : "warning"
                                    }`}
                                >
                                    {totalCount}
                                </span>
                            </Link>
                        </li>
                        <li style={{ margin: "auto" }}>
                            <Link
                                className={`nav-link hover-navlink text-${
                                    props.mode === "light" ? "black" : "white"
                                } mx-2 hover-underline`}
                                style={{ fontSize: "1.10rem" }}
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
                                                placeholder="Search by Event Title or Status..."
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                aria-label="Search Event Title"
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
                                        height: "25rem",
                                        overflowY: "auto",
                                    }}
                                >
                                    {searchQuery !== "" ? (
                                        filteredEvents.map((event) => (
                                            <div
                                                key={event._id}
                                                className={`mt-2    mb-5 text-${
                                                    props.mode === "light"
                                                        ? "black"
                                                        : "white"
                                                }`}
                                                onClick={() =>
                                                    handleEventClick(event._id)
                                                }
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className="me-2"
                                                        style={{
                                                            width: "1.25rem",
                                                            height: "1.25rem",
                                                            borderRadius: "50%",
                                                            backgroundColor:
                                                                event.color,
                                                        }}
                                                    ></div>
                                                    <h3 className="my-0">
                                                        {event.title}
                                                    </h3>
                                                </div>
                                                <p>
                                                    <strong>
                                                        Description:
                                                    </strong>{" "}
                                                    {event.describe}
                                                </p>
                                                <p>
                                                    <strong>Start:</strong>{" "}
                                                    {new Date(
                                                        event.start
                                                    ).toLocaleString()}
                                                </p>
                                                <p>
                                                    <strong>End:</strong>{" "}
                                                    {new Date(
                                                        event.end
                                                    ).toLocaleString()}
                                                </p>
                                                <p>
                                                    <strong>Status:</strong>{" "}
                                                    {event.status}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p
                                            className={`text-${
                                                props.mode === "light"
                                                    ? "black"
                                                    : "light"
                                            }`}
                                        >
                                            Enter a search query to find events
                                            by title or status.
                                        </p>
                                    )}
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
                        </li>
                        <li className="nav-item d-flex justify-content-center">
                            <Link
                                className={`nav-link hover-underline text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                style={{ fontSize: "1.10rem" }}
                                to="/home"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item d-flex justify-content-center">
                            <Link
                                className={`nav-link hover-underline text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                style={{ fontSize: "1.10rem" }}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item d-flex justify-content-center">
                            <Link
                                className={`nav-link hover-underline text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                style={{ fontSize: "1.10rem" }}
                                to="/categories"
                            >
                                Categories
                            </Link>
                        </li>
                        <li
                            className="nav-item dropdown"
                            style={{ margin: "auto" }}
                        >
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
                                        setShowCalendarDropdown(
                                            !showCalendarDropdown
                                        );
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
                                            setShowOffcanvas(false);
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
                                            setShowOffcanvas(false);
                                            navigate("/events2");
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
            </div>
        </>
    );
};

export default NavbarLoggedIn;
