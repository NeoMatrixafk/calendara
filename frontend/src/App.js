import { useState, useEffect } from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";

import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Events from "./Pages/Events";
import Profile from "./Pages/Profile";
import AddEvent from "./Pages/AddEvent";
import About from "./Pages/About";

import Error404 from "./Pages/Error404";

function App() {
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
    } else {
        document.documentElement.style.setProperty(
            "--underline-color",
            "white"
        );
    }

    if (mode === "light") {
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
    } else {
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
    }

    return (
        <>
            <Router>
                <div
                    style={{
                        backgroundColor: mode === "light" ? "white" : "#36393E",
                    }}
                >
                    <Navbar mode={mode} toggleMode={toggleMode} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Navigate replace to="/home" mode={mode} />
                            }
                        />
                        <Route
                            exacts
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
                        <Route path="/about" element={<About mode={mode} />} />

                        <Route path="*" element={<Error404 mode={mode} />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </>
    );
}

export default App;
