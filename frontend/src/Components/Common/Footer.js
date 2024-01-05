import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="bg-dark text-center text-white w-100 h-auto">
                <div className="container p-4">
                    <section className="mb-4">
                        <Link
                            className="btn btn-dark btn-floating btn-shadow-white m-1"
                            to="https://www.facebook.com/"
                            role="button"
                        >
                            <i className="bi bi-facebook"></i>
                        </Link>

                        <Link
                            className="btn btn-dark btn-floating btn-shadow-white m-1"
                            to="https://www.whatsapp.com/"
                            role="button"
                        >
                            <i className="bi bi-whatsapp"></i>
                        </Link>

                        <Link
                            className="btn btn-dark btn-floating btn-shadow-white m-1"
                            to="https://www.instagram.com/"
                            role="button"
                        >
                            <i className="bi bi-instagram"></i>
                        </Link>

                        <Link
                            className="btn btn-dark btn-floating btn-shadow-white m-1"
                            to="https://www.twitter.com/"
                            role="button"
                        >
                            <i className="bi bi-twitter-x"></i>
                        </Link>

                        <Link
                            className="btn btn-dark btn-floating btn-shadow-white m-1"
                            to="https://www.linkedin.com/"
                            role="button"
                        >
                            <i className="bi bi-linkedin"></i>
                        </Link>

                        <Link
                            className="btn btn-dark btn-floating btn-shadow-white m-1"
                            to="https://www.discord.com/"
                            role="button"
                        >
                            <i className="bi bi-discord"></i>
                        </Link>
                    </section>

                    <section className="my-4">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase ">About Us</h5>

                                <ul className="list-unstyled mb-0 my-3">
                                    <li>
                                        <Link
                                            to="/about"
                                            className="text-white text-decoration-none"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/terms"
                                            className="text-white text-decoration-none"
                                        >
                                            T&C
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase ">Help</h5>

                                <ul className="list-unstyled mb-0 my-3">
                                    <li>
                                        <Link
                                            to="/policy"
                                            className="text-white text-decoration-none"
                                        >
                                            Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/faq"
                                            className="text-white text-decoration-none"
                                        >
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/help"
                                            className="text-white text-decoration-none"
                                        >
                                            Help & Support
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/contact"
                                            className="text-white text-decoration-none"
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase ">Policy</h5>

                                <ul className="list-unstyled mb-0 my-3">
                                    <li>
                                        <Link
                                            to="/policy"
                                            className="text-white text-decoration-none"
                                        >
                                            User Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/policy"
                                            className="text-white text-decoration-none"
                                        >
                                            Privacy
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase ">Our Address</h5>

                                <ul className="list-unstyled  mb-0 my-3">
                                    Ramrao Adik Institue of Technology, DY Patil
                                    Deemed to be University, Nerul, Navi Mumbai,
                                    Maharashtra, 400706
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <div
                    className="text-center  w-auto p-3"
                    style={{ backgroundColor: "#1a1a1a" }}
                >
                    © 2024 Copyright: calendara
                </div>
            </footer>
        </>
    );
};

export default Footer;
