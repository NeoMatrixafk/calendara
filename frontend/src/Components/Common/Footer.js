import React from "react";
import { Link } from "react-router-dom";

import FooterSocialButton from "./FooterSocialButton";

const Footer = (props) => {
    return (
        <>
            <footer
                className="text-center text-white w-100 h-auto"
                style={{
                    backgroundColor:
                        props.mode === "light" ? "#1d2349" : "#212529",
                }}
            >
                <div className="container p-4">
                    <section className="mb-4">
                        <FooterSocialButton
                            site={"facebook"}
                            btn={"facebook"}
                            mode={props.mode}
                        />

                        <FooterSocialButton
                            site={"whatsapp"}
                            btn={"whatsapp"}
                            mode={props.mode}
                        />

                        <FooterSocialButton
                            site={"instagram"}
                            btn={"instagram"}
                            mode={props.mode}
                        />

                        <FooterSocialButton
                            site={"twitter"}
                            btn={"twitter-x"}
                            mode={props.mode}
                        />

                        <FooterSocialButton
                            site={"linkedin"}
                            btn={"linkedin"}
                            mode={props.mode}
                        />

                        <FooterSocialButton
                            site={"discord"}
                            btn={"discord"}
                            mode={props.mode}
                        />
                    </section>

                    <section className="my-4">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase ">About Us</h5>

                                <ul className="list-unstyled mb-0 my-3">
                                    <li>
                                        <Link
                                            to="/about-us"
                                            className="text-white text-decoration-none"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/about-site"
                                            className="text-white text-decoration-none"
                                        >
                                            About Site
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
                                            to="/faq"
                                            className="text-white text-decoration-none"
                                        >
                                            FAQ
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
                                            to="/user-policy"
                                            className="text-white text-decoration-none"
                                        >
                                            User Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/privacy-policy"
                                            className="text-white text-decoration-none"
                                        >
                                            Privacy Policy
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
                    className="text-center w-auto p-3"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "#0e1225" : "#1a1a1a",
                    }}
                >
                    © 2024 Copyright: calendara
                </div>
            </footer>
        </>
    );
};

export default Footer;
