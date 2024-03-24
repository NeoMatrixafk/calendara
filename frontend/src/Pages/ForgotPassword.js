import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:55555/api/forgotpassword";
        const data = { email };

        try {
            const response = await axios.post(url, data);
            if (response.status === 201) {
                window.alert("Forgot password request successful!");
                navigate("/");
            } else {
                throw new Error("Failed to submit request"); // Throw error for unexpected response status
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            alert(
                error.message || "An error occurred. Please try again later."
            ); // Display user-friendly message
        }
    };

    return (
        <>
            <Link to="/home">
                <img
                    src={require("../Components/Login/calendara_auth.png")}
                    alt="calendara Auth"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                        height: "7rem",
                    }}
                />
            </Link>

            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 className="montserrat-regular-400 mb-5 d-flex justify-content-center">
                        <b>Forgot Password?</b>
                    </h2>
                    <p style={styles.description}>
                        Enter your email address, and we'll send you
                        instructions to reset your password.
                    </p>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <button type="submit" style={styles.submitButton}>
                            Reset Password
                        </button>
                    </form>
                    <Link to="/sign-in" style={styles.backLink}>
                        Back to Login
                    </Link>
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: "400px",
        padding: "40px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
    },
    description: {
        fontSize: "16px",
        color: "#666666",
        marginBottom: "30px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "12px 16px",
        marginBottom: "20px",
        border: "1px solid #cccccc",
        borderRadius: "4px",
        fontSize: "16px",
    },
    submitButton: {
        padding: "12px 16px",
        backgroundColor: "#007bff",
        color: "#ffffff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    backLink: {
        marginTop: "20px",
        textAlign: "center",
        display: "block",
        textDecoration: "none",
        color: "#007bff",
    },
};

export default ForgotPassword;
