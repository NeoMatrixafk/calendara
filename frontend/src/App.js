import "./App.css";
import { useState, useEffect } from "react";
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Navbar from "./Components/Common/Navbar";
import Navbar2 from "./Components/Common/Navbar2";
import Footer from "./Components/Common/Footer";

import Home from "./Pages/Home";
import Home2 from "./Pages/Home2";
import Categories from "./Pages/Categories";
import Events from "./Pages/Events";
import Profile from "./Pages/Profile";
import AddEvent from "./Pages/AddEvent";
import About from "./Pages/About";

import Error404 from "./Pages/Error404";

import Auth from "./Pages/Auth";

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
    }

    const pathsWithoutNavbarFooter = ["/auth"];

    const shouldRenderNavbarFooter = !pathsWithoutNavbarFooter.includes(window.location.pathname);

    return (
        <>
                <div

                    style={{
                        backgroundColor: mode === "light" ? "white" : "#36393E",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh"

                    }}
                >
                    {shouldRenderNavbarFooter && (
                    <>
                        {user ? (
                            <Navbar mode={mode} toggleMode={toggleMode} />
                        ) : (
                            <Navbar2 />
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
                                    element={<Navigate replace to="/home" mode={mode} />}
                                />

                                <Route
                                    path="/home"
                                    element={<Home mode={mode} />}
                                />
                                <Route
                                    path="/categories"
                                    element={<Categories mode={mode} />}
                                />
                                <Route
                                    path="/events"
                                    element={<Events mode={mode} />}
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
                            </>
                        ) : (
                            <>
                                <Route
                                    path="*"
                                    element={<Home2 mode={mode} />}
                                />
                                <Route
                                    path="/"
                                    element={<Home2 mode={mode} />}
                                />
                            </>
                        )}
                    </Routes>
                </div>

                {shouldRenderNavbarFooter && <Footer />}
            
                </div>
        </>
    );
}

export default App;
