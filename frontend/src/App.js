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
import About from "./Pages/About";

import Error404 from "./Pages/Error404";

import Auth from "./Pages/Auth";

import MyCalendar from "./Components/Calendar/Calendar";
import AddEvents from "./Components/Calendar/AddEvents";
import UpdateEvent from "./Components/Calendar/UpdateEvent";

import LightMode from "./Logic/LightMode";
import DarkMode from "./Logic/DarkMode";

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
        LightMode();
    } else {
        DarkMode();
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
                                    element={<AddEvents mode={mode} />}
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
                                {/* <Route
                                    path="/events/add"
                                    element={<AddEvents />}
                                /> */}
                                {/* added this component in /add-event route */}
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
