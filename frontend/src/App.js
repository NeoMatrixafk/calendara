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
import AboutUs from "./Pages/AboutUs";
import AboutSite from "./Pages/AboutSite";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import UserPolicy from "./Pages/UserPolicy";
import Terms from "./Pages/Terms";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Dashboard from "./Pages/Dashboard";
import Auth from "./Pages/Auth";
import AccountSettings from "./Pages/AccountSettings";
import MoreSettings from "./Pages/MoreSettings";
import Reminders from "./Pages/Reminders";
import Error404 from "./Pages/Error404";

import UpdateProfile from "./Components/Profile/UpdateProfile";

import MyCalendar from "./Components/Calendar/Calendar";
import AddEvents from "./Components/Calendar/AddEvents";
import UpdateEvent from "./Components/Calendar/UpdateEvent";

import LightMode from "./Logic/LightMode";
import DarkMode from "./Logic/DarkMode";
import UploadEvents from "./Components/Calendar/UploadEvents";

function App() {
    const user = localStorage.getItem("token");

    const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

    const [eventsCount, setEventsCount] = useState(0);
    const handleEventsCountChange = (count) => {
        setEventsCount(count);
    };

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
                                eventsCount={eventsCount}
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
                                    path="/profile/update-profile"
                                    element={<UpdateProfile mode={mode} />}
                                />
                                <Route
                                    path="/profile/upload-events"
                                    element={<UploadEvents mode={mode} />}
                                />
                                <Route
                                    path="/profile/account-settings"
                                    element={<AccountSettings mode={mode} />}
                                />
                                <Route
                                    path="/profile/more-settings"
                                    element={<MoreSettings mode={mode} />}
                                />
                                <Route
                                    path="/add-event"
                                    element={<AddEvents mode={mode} />}
                                />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard mode={mode} />}
                                />
                                <Route
                                    path="/reminders"
                                    element={
                                        <Reminders
                                            mode={mode}
                                            onEventsCountChange={
                                                handleEventsCountChange
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="/about-us"
                                    element={<AboutUs mode={mode} />}
                                />
                                <Route
                                    path="/about-site"
                                    element={<AboutSite mode={mode} />}
                                />
                                <Route
                                    path="/contact"
                                    element={<Contact mode={mode} />}
                                />
                                <Route
                                    path="/faq"
                                    element={<FAQ mode={mode} />}
                                />
                                <Route
                                    path="/user-policy"
                                    element={<UserPolicy mode={mode} />}
                                />
                                <Route
                                    path="/terms"
                                    element={<Terms mode={mode} />}
                                />
                                <Route
                                    path="/privacy-policy"
                                    element={<PrivacyPolicy mode={mode} />}
                                />
                                <Route
                                    path="/events"
                                    element={<MyCalendar mode={mode} />}
                                />
                                <Route
                                    path="/event/:id/update"
                                    element={<UpdateEvent mode={mode} />}
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
                                    element={<HomeLoggedOut mode={mode} />}
                                />
                                <Route
                                    path="/"
                                    element={<HomeLoggedOut mode={mode} />}
                                />
                                <Route
                                    path="/faq"
                                    element={<FAQ mode={mode} />}
                                />
                                <Route
                                    path="/user-policy"
                                    element={<UserPolicy mode={mode} />}
                                />
                                <Route
                                    path="/terms"
                                    element={<Terms mode={mode} />}
                                />
                                <Route
                                    path="/privacy-policy"
                                    element={<PrivacyPolicy mode={mode} />}
                                />
                                <Route
                                    path="/about-us"
                                    element={<AboutUs mode={mode} />}
                                />
                                <Route
                                    path="/about-site"
                                    element={<AboutSite mode={mode} />}
                                />
                                <Route
                                    path="/contact"
                                    element={<Contact mode={mode} />}
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
