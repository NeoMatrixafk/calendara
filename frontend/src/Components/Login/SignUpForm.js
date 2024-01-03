import React from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    return (
        <>
            <div className="form-container sign-up">
                <form action="/signup" method="post">
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <Link to="/login" className="icon">
                            <i className="bi bi-google"></i>
                        </Link>
                        <Link to="/login" className="icon">
                            <i className="bi bi-facebook"></i>
                        </Link>
                        <Link to="/login" className="icon">
                            <i className="bi bi-microsoft"></i>
                        </Link>
                        <Link to="/login" className="icon">
                            <i className="bi bi-apple"></i>
                        </Link>
                    </div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                    />
                    <button>Register</button>
                </form>
            </div>
        </>
    );
};

export default SignUpForm;
