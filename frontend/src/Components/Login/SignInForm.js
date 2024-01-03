import React from "react";
import { Link } from "react-router-dom";

const SignInForm = () => {
    return (
        <>
            <div className="form-container sign-in">
                <form action="/login" method="post">
                    <h1>Log In</h1>
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
                    <Link to="login">Forget Your Password?</Link>
                    <button>Log In</button>
                </form>
            </div>
        </>
    );
};

export default SignInForm;
