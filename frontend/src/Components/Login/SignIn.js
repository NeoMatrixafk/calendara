import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

import waveBG from "./wave-auth-bg.svg";
import defaultProfileImg from "./defaultProfile.jpg";

import { auth } from "./firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    OAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    linkWithCredential,
    unlink,
    GithubAuthProvider,
} from "firebase/auth";

const SignIn = (props) => {
    const [authe, setAuthe] = useState(
        false || window.localStorage.getItem("auth") === "true"
    );
    const [token, setToken] = useState("");

    let total = authe + token;
    total = "";
    console.log(total);

    const [viewPassword, setViewPassword] = useState(true);

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    // const showAlert = () => alert("This feature will be added shortly.");

    const [data, setData] = useState({
        email: "",
        contact: "",
        password: "",
    });

    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || ""
    );
    const [email, setEmail] = useState(localStorage.getItem("email") || "");

    const [contact, setContact] = useState(
        localStorage.getItem("contact") || ""
    );

    const [imageData, setImageData] = useState(
        localStorage.getItem("userProfileImage") || ""
    );
    const [bgimageData, setbgImageData] = useState(
        localStorage.getItem("userBGImage") || ""
    );

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    useEffect(() => {
        //This function gets user data to display on profile page.

        const fetchData = async () => {
            try {
                const nameURL = `http://localhost:55555/api/getData/${data.email}`;
                const response = await axios.get(nameURL);
                setUserName(response.data.name);
                setContact(response.data.contact);

                const imagenameURL = `http://localhost:55555/api/profilepic/${data.email}`;
                const response1 = await axios.get(imagenameURL);
                if (response1.data.imageData) {
                    setImageData(response1.data.imageData);
                    localStorage.setItem(
                        "userProfileImage",
                        response1.data.imageData
                    );
                }

                const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${data.email}`;
                const response2 = await axios.get(bgimagenameURL);
                if (response2.data.bgimageData) {
                    setbgImageData(response2.data.bgimageData);
                    localStorage.setItem(
                        "userBGImage",
                        response2.data.bgimageData
                    );
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        if (data.email && data.contact) {
            fetchData();
        }
    }, [data.email, data.contact, setContact, setUserName]);

    const handleSubmit = async (e) => {
        // This function runs when Login button is clicked on.

        e.preventDefault();

        const url = "http://localhost:55555/api/auth";

        try {
            const { data: res } = await axios.post(url, data);
            const nameURL = `http://localhost:55555/api/getData/${data.email}`;
            const response = await axios.get(nameURL);

            setUserName(response.data.name);
            setEmail(response.data.email);
            setContact(response.data.contact);
            console.log(userName);
            console.log(email);
            console.log(contact);

            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("contact", response.data.contact);
            localStorage.setItem("token", res.data);

            const imagenameURL = `http://localhost:55555/api/profilepic/${data.email}`;
            const response1 = await axios.get(imagenameURL);

            if (response1.data.imageData) {
                setImageData(response1.data.imageData);
                localStorage.setItem(
                    "userProfileImage",
                    response1.data.imageData
                );
                console.log(imageData);
            }

            const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${data.email}`;
            const response2 = await axios.get(bgimagenameURL);

            if (response2.data.bgimageData) {
                setbgImageData(response2.data.bgimageData);
                localStorage.setItem("userBGImage", response2.data.bgimageData);
                console.log(bgimageData);
            }

            window.alert(`Welcome ${response.data.name || data.email}!`);
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Invalid Email!");
            } else if (error.response && error.response.status === 402) {
                alert("Invalid Password!");
            } else {
                console.error("Error:", error);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const email = result.user.email;
            const name = result.user.displayName;
            const contact = result.user.phoneNumber || "";
            const profilePic = result.user.photoURL || defaultProfileImg;

            console.log(contact);
            console.log(profilePic);

            localStorage.setItem("email", email);
            localStorage.setItem("userName", name);
            localStorage.setItem("contact", contact);
            localStorage.setItem("userProfileImage", profilePic);

            const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
            console.log(bgimagenameURL);
            const response2 = await axios.get(bgimagenameURL);

            if (response2.data.bgimageData) {
                setbgImageData(response2.data.bgimageData);
                localStorage.setItem("userBGImage", response2.data.bgimageData);
                console.log(bgimageData);
            }

            console.log("User signed in successfully with Google");
            window.alert(`Welcome ${name || email}!`);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleMicrosoftSignIn = async () => {
        try {
            const provider = new OAuthProvider("microsoft.com");
            provider.addScope("user.read");

            provider.setCustomParameters({
                prompt: "consent",
            });

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const email = user.email;
            const name = user.displayName;

            const contact = user.phoneNumber || "";
            const profilePic = user.photoURL || defaultProfileImg;

            localStorage.setItem("email", email);
            localStorage.setItem("userName", name);
            localStorage.setItem("contact", contact);
            localStorage.setItem("userProfileImage", profilePic);

            const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
            console.log(bgimagenameURL);
            const response2 = await axios.get(bgimagenameURL);

            if (response2.data.bgimageData) {
                setbgImageData(response2.data.bgimageData);
                localStorage.setItem("userBGImage", response2.data.bgimageData);
                console.log(bgimageData);
            }

            window.location.reload();
            console.log("User signed in successfully");

            console.log("User signed in successfully with Microsoft");
        } catch (error) {
            console.error("Error signing in with Microsoft:", error);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const email = result.user.email;
            const name = result.user.displayName;
            const contact = result.user.phoneNumber;
            const profilePic = result.user.photoURL || defaultProfileImg;

            localStorage.setItem("email", email);
            localStorage.setItem("userName", name);
            localStorage.setItem("contact", contact);
            localStorage.setItem("userProfileImage", profilePic);

            const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
            console.log(bgimagenameURL);
            const response2 = await axios.get(bgimagenameURL);

            if (response2.data.bgimageData) {
                setbgImageData(response2.data.bgimageData);
                localStorage.setItem("userBGImage", response2.data.bgimageData);
                console.log(bgimageData);
            }

            window.location.reload();
            console.log("User signed in successfully with Facebook");
        } catch (error) {
            console.error("Error signing in with Facebook:", error);
        }
    };

    const handleTwitterSignIn = async () => {
        try {
            const provider = new TwitterAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const user = result.user;

            if (user) {
                // User is already signed in
                try {
                    // Try to link the Twitter account
                    await linkWithCredential(user, credential);
                    console.log("Twitter account linked successfully");

                    const email = user.email;
                    const name = user.displayName;
                    const contact = user.phoneNumber || "";
                    const profilePic = user.photoURL || defaultProfileImg;

                    localStorage.setItem("email", email);
                    localStorage.setItem("userName", name);
                    localStorage.setItem("contact", contact);
                    localStorage.setItem("userProfileImage", profilePic);

                    window.location.reload();
                    console.log("User signed in successfully with Twitter");
                } catch (error) {
                    if (error.code === "auth/provider-already-linked") {
                        // Twitter account is already linked to another account
                        console.error(
                            "Twitter account is already linked to another account."
                        );

                        // Attempt to unlink the Twitter account
                        try {
                            await unlink(user, "twitter.com");
                            console.log(
                                "Twitter account unlinked successfully"
                            );

                            // Link the Twitter account again
                            await linkWithCredential(user, credential);
                            console.log("Twitter account linked successfully");

                            const email = user.email;
                            const name = user.displayName;
                            const contact = user.phoneNumber || "";
                            const profilePic = user.photoURL || "";

                            localStorage.setItem("email", email);
                            localStorage.setItem("userName", name);
                            localStorage.setItem("contact", contact);
                            localStorage.setItem(
                                "userProfileImage",
                                profilePic
                            );

                            window.location.reload();
                            console.log(
                                "User signed in successfully with Twitter"
                            );
                        } catch (unlinkError) {
                            console.error(
                                "Error unlinking Twitter account:",
                                unlinkError
                            );
                        }
                    } else {
                        console.error("Error linking Twitter account:", error);
                    }
                }
            } else {
                // User is not signed in
                // Proceed with the sign-in flow
                const email = result.additionalUserInfo?.profile?.email;
                const name = result.additionalUserInfo?.profile?.name;
                const contact = result.additionalUserInfo?.profile?.contact;
                const profilePic =
                    result.additionalUserInfo?.profile?.profilePic;

                localStorage.setItem("email", email);
                localStorage.setItem("userName", name);
                localStorage.setItem("contact", contact);
                localStorage.setItem("userProfileImage", profilePic);

                const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
                console.log(bgimagenameURL);

                // Error handling for API call
                try {
                    const response2 = await axios.get(bgimagenameURL);
                    if (response2.data.bgimageData) {
                        setbgImageData(response2.data.bgimageData); // Assuming state variable for background image
                        localStorage.setItem(
                            "userBGImage",
                            response2.data.bgimageData
                        );
                    }
                } catch (error) {
                    console.error(
                        "Error fetching user background image:",
                        error
                    );
                }

                window.location.reload();
                console.log("User signed in successfully with Twitter");
            }
        } catch (error) {
            console.error("Error signing in with Twitter:", error);
        }
    };

    const handleGitHubSignIn = async () => {
        try {
            const provider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const user = result.user;

            if (user) {
                // User is already signed in
                try {
                    // Try to link the GitHub account
                    await linkWithCredential(user, credential);
                    console.log("GitHub account linked successfully");

                    // Retrieve and store user information
                    const email = user.email;
                    const name = user.displayName;
                    const contact = user.phoneNumber || "";
                    const profilePic = user.photoURL || defaultProfileImg;

                    localStorage.setItem("email", email);
                    localStorage.setItem("userName", name);
                    localStorage.setItem("contact", contact);
                    localStorage.setItem("userProfileImage", profilePic);

                    window.location.reload();
                    console.log("User signed in successfully with GitHub");
                } catch (linkError) {
                    if (linkError.code === "auth/provider-already-linked") {
                        // GitHub account is already linked to another account
                        console.error(
                            "GitHub account is already linked to another account."
                        );

                        // Attempt to unlink the GitHub account
                        try {
                            await unlink(user, "github.com");
                            console.log("GitHub account unlinked successfully");

                            // Link the GitHub account again
                            await linkWithCredential(user, credential);
                            console.log("GitHub account linked successfully");

                            // Retrieve and store user information
                            const email = user.email;
                            const name = user.displayName;
                            const profilePic = user.photoURL || "";

                            localStorage.setItem("email", email);
                            localStorage.setItem("userName", name);
                            localStorage.setItem(
                                "userProfileImage",
                                profilePic
                            );

                            window.location.reload();
                            console.log(
                                "User signed in successfully with GitHub"
                            );
                        } catch (unlinkError) {
                            console.error(
                                "Error unlinking GitHub account:",
                                unlinkError
                            );
                        }
                    } else {
                        console.error(
                            "Error linking GitHub account:",
                            linkError
                        );
                    }
                }
            } else {
                // User is not signed in
                // Proceed with the sign-in flow
                const email = result.additionalUserInfo?.profile?.email;
                const name = result.additionalUserInfo?.profile?.name;
                const profilePic =
                    result.additionalUserInfo?.profile?.profilePic;

                localStorage.setItem("email", email);
                localStorage.setItem("userName", name);
                localStorage.setItem("userProfileImage", profilePic);

                window.location.reload();
                console.log("User signed in successfully with GitHub");
            }
        } catch (error) {
            if (
                error.code === "auth/account-exists-with-different-credential"
            ) {
                // Handle the "auth/account-exists-with-different-credential" error
                // You can prompt the user to link their accounts or sign in with the existing provider
                console.error("Account exists with different credential");
            } else {
                console.error("Error signing in with GitHub:", error);
            }
        }
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthe(true);
            window.localStorage.setItem("auth", "true");
            user.getIdToken().then((token) => {
                setToken(token);
            });
        }
    });

    const isMobile = window.innerWidth <= 768;

    return (
        <>
            <Link to="/">
                <img
                    src={require("./calendara_auth.png")}
                    alt="calendara Auth"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                    }}
                    className="auth-logo"
                />
            </Link>

            <div
                style={{
                    display: "flex",
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#f5f5f5",
                    backgroundImage: !isMobile ? `url(${waveBG})` : "",
                    backgroundSize: "100% auto",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom",
                }}
            >
                <div style={styles.card}>
                    <h2 className="montserrat-regular-400 mb-2 d-flex justify-content-center">
                        <b>Welcome Back!</b>
                    </h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <label htmlFor="" style={{ fontSize: "0.75rem" }}>
                            Email
                        </label>
                        <input
                            style={styles.input}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="" style={{ fontSize: "0.75rem" }}>
                            Password
                        </label>
                        <div className="input-group w-100">
                            <input
                                style={styles.password}
                                type={viewPassword ? "password" : "text"}
                                id="signup-password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className=""
                                style={{
                                    padding: "12px 16px",
                                    marginBottom: "20px",
                                    border: "1px solid #cccccc",
                                    borderRadius: "0 4px 4px 0",
                                    fontSize: "16px",
                                    backgroundColor: "#007bff",
                                }}
                                onClick={() => toggleViewPassword()}
                            >
                                <i
                                    className={`bi bi-eye${
                                        viewPassword ? "-slash" : ""
                                    }`}
                                    style={{
                                        color: "white",
                                    }}
                                ></i>
                            </button>
                        </div>
                        <Link
                            className="forgot-password-link text-primary mb-4 "
                            style={{
                                textDecoration: "none",
                                fontSize: "0.75rem",
                                marginRight: "auto",
                            }}
                            to="/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                        <button
                            className="btn mt-3"
                            style={styles.submitButton}
                        >
                            Sign In
                        </button>
                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                className="mx-1 btn btn-light"
                                onClick={handleGoogleSignIn}
                            >
                                <i className="bi bi-google"></i>
                            </Button>
                            <Button
                                className="mx-1 btn btn-light"
                                onClick={handleFacebookSignIn}
                            >
                                <i className="bi bi-facebook"></i>
                            </Button>
                            <Button
                                className="mx-1 btn btn-light"
                                onClick={handleMicrosoftSignIn}
                            >
                                <i className="bi bi-microsoft"></i>
                            </Button>
                            <Button
                                className="mx-1 btn btn-light"
                                onClick={handleTwitterSignIn}
                            >
                                <i className="bi bi-twitter-x"></i>
                            </Button>
                            <Button
                                className="mx-1 btn btn-light"
                                onClick={handleGitHubSignIn}
                            >
                                <i className="bi bi-github"></i>
                            </Button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center mt-2">
                        <Link
                            className="forgot-password-link text-primary"
                            style={{ textDecoration: "none" }}
                            to="/sign-up"
                        >
                            Don't have an account? Sign Up!
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    card: {
        width: "400px",
        padding: "30px 40px",
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
    password: {
        padding: "12px 16px",
        marginBottom: "20px",
        border: "1px solid #cccccc",
        borderRadius: "4px 0 0 4px",
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

export default SignIn;
