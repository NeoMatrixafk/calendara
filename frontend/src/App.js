import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import NavbarLoggedIn from "./Components/Common/NavbarLoggedIn";
import NavbarLoggedOut from "./Components/Common/NavbarLoggedOut";
import Footer from "./Components/Common/Footer";

import HomeLoggedIn from "./Pages/HomeLoggedIn";
import HomeLoggedOut from "./Pages/HomeLoggedOut";
import Categories from "./Pages/Categories";
import Profile from "./Pages/Profile";
import AddEvent from "./Pages/AddEvent";
import About from "./Pages/About";

import Error404 from "./Pages/Error404";

import Auth from "./Pages/Auth";

import MyCalendar from "./Components/Calendar/Calendar";
import AddEvents from "./Components/Calendar/AddEvents";
import UpdateEvent from "./Components/Calendar/UpdateEvent";

function App() {
    const user = localStorage.getItem("token");

    const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

    useEffect(() => {
        const savedMode = localStorage.getItem("mode") || "light";
        setMode(savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
        } else {
            setMode("light");
        }
    };

    const location = useLocation();

    const pathsWithoutNavbarFooter = ["/auth"];
    const shouldRenderNavbarFooter = !pathsWithoutNavbarFooter.includes(
        location.pathname
    );

    if (mode === "light") {
        document.documentElement.style.setProperty(
            "--underline-color",
            "black"
        );

        document.documentElement.style.setProperty(
            "--scrollbar-track-color",
            "#D3D3D3"
        );
        document.documentElement.style.setProperty(
            "--scrollbar-thumb-color",
            "#0d6efd"
        );
        document.documentElement.style.setProperty(
            "--scrollbar-thumb-hover-color",
            "#7c95eb"
        );
        document.documentElement.style.setProperty(
            "--scrollbar-button-color",
            "white"
        );

        document.documentElement.style.setProperty(
            "--rbc-header-color",
            "#3498db"
        );
        document.documentElement.style.setProperty(
            "--rbc-off-range-bg-color",
            "#f0f0f0"
        );

        document.documentElement.style.setProperty(
            "--datepicker-color",
            "white"
        );

        document.documentElement.style.setProperty(
            "--toggle-first-color",
            "#5c6bc0"
        );
        document.documentElement.style.setProperty(
            "--toggle-last-color",
            "#4758b8"
        );

        document.documentElement.style.setProperty("--inputColor", "");
    } else {
        document.documentElement.style.setProperty(
            "--underline-color",
            "white"
        );

        document.documentElement.style.setProperty(
            "--scrollbar-track-color",
            "#4D4D4D"
        );
        document.documentElement.style.setProperty(
            "--scrollbar-thumb-color",
            "gray"
        );
        document.documentElement.style.setProperty(
            "--scrollbar-thumb-hover-color",
            "gainsboro"
        );
        document.documentElement.style.setProperty(
            "--scrollbar-button-color",
            "#36393e"
        );

        document.documentElement.style.setProperty(
            "--rbc-header-color",
            "#607d8b"
        );
        document.documentElement.style.setProperty(
            "--rbc-off-range-bg-color",
            "#595959"
        );

        document.documentElement.style.setProperty(
            "--datepicker-color",
            "#666B74"
        );

        document.documentElement.style.setProperty(
            "--toggle-first-color",
            "#1d2349"
        );
        document.documentElement.style.setProperty(
            "--toggle-last-color",
            "#0e1225"
        );

        document.documentElement.style.setProperty("--inputColor", "gray");
    }

    return (
        <>
            <div
                style={{
                    backgroundColor: mode === "light" ? "white" : "#36393E",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                {shouldRenderNavbarFooter && (
                    <>
                        {user ? (
                            <NavbarLoggedIn
                                mode={mode}
                                toggleMode={toggleMode}
                            />
                        ) : (
                            <NavbarLoggedOut
                                mode={mode}
                                toggleMode={toggleMode}
                            />
                        )}
                    </>
                )}

                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route
                            path="/auth"
                            element={
                                user ? (
                                    <Navigate replace to="/home" mode={mode} />
                                ) : (
                                    <Auth mode={mode} />
                                )
                            }
                        />
                        {user ? (
                            <>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate
                                            replace
                                            to="/home"
                                            mode={mode}
                                        />
                                    }
                                />
                                <Route
                                    path="/home"
                                    element={<HomeLoggedIn mode={mode} />}
                                />
                                <Route
                                    path="/categories"
                                    element={<Categories mode={mode} />}
                                />
                                <Route
                                    path="/profile"
                                    element={<Profile mode={mode} />}
                                />
                                <Route
                                    path="/add-event"
                                    element={<AddEvent mode={mode} />}
                                />
                                <Route
                                    path="/about"
                                    element={<About mode={mode} />}
                                />
                                <Route
                                    path="*"
                                    element={<Error404 mode={mode} />}
                                />
                                <Route
                                    path="/events"
                                    element={<MyCalendar mode={mode} />}
                                />
                                <Route
                                    path="/events/add"
                                    element={<AddEvents />}
                                />
                                <Route
                                    path="/event/:id/update"
                                    element={<UpdateEvent />}
                                />
                            </>
                        ) : (
                            <>
                                <Route
                                    path="*"
                                    element={<HomeLoggedOut mode={mode} />}
                                />
                                <Route
                                    path="/"
                                    element={<HomeLoggedOut mode={mode} />}
                                />
                            </>
                        )}
                    </Routes>
                </div>

                {shouldRenderNavbarFooter && <Footer mode={mode} />}
            </div>
        </>
    );
}

export default App;
