// import React, { useState } from "react"; //imports
// import { Button } from "react-bootstrap";
// import axios from "axios";

// import { auth } from "./firebase";
// import {
//     GoogleAuthProvider,
//     signInWithPopup,
//     onAuthStateChanged,
//     OAuthProvider,
//     FacebookAuthProvider,
//     TwitterAuthProvider,
//     linkWithCredential,
//     unlink,
//     GithubAuthProvider,
// } from "firebase/auth";

// const SignUpForm = (props) => {
//     const [authe, setAuthe] = useState(
//         false || window.localStorage.getItem("auth") === "true"
//     );
//     const [token, setToken] = useState("");

//     let total = authe + token;
//     total = "";
//     console.log(total);

//     const [bgimageData, setbgImageData] = useState(
//         localStorage.getItem("userBGImage") || ""
//     ); //remove this as this is signup page

//     const [data, setData] = useState({
//         name: "",
//         contact: "",
//         email: "",
//         password: "",
//     });

//     const [viewPassword, setViewPassword] = useState(true);

//     const [contact, setContact] = useState(
//         localStorage.getItem("contact") || ""
//     );

//     const toggleViewPassword = () => {
//         setViewPassword(!viewPassword);
//     };

//     const handleChange = ({ currentTarget: input }) => {
//         setData({ ...data, [input.name]: input.value });
//     };

//     const handleSubmit = async (e) => {
//         // This function runs when Register button is clicked on.

//         e.preventDefault();

//         const url = "http://localhost:55555/api/users";

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const isValidEmail = emailRegex.test(data.email);

//         if (!isValidEmail) {
//             alert("Enter a valid email!");
//             console.error(
//                 'Invalid email format. Must contain "@" and at least one dot.'
//             );
//             return;
//         }

//         if (data.contact.length !== 10) {
//             alert("Contact must contain exactly 10 numbers!");
//             return;
//         }

//         try {
//             const { data: res } = await axios.post(url, data);

//             setContact(data.contact);
//             console.log(contact);

//             localStorage.setItem("contact", data.contact);

//             window.alert(`Account created successfully for ${data.name}.`);
//             window.location.reload();

//             console.log(res.message);
//         } catch (error) {
//             if (error.response && error.response.status === 408) {
//                 alert("Contact already exists!");
//             } else if (error.response && error.response.status === 409) {
//                 alert("Email already exists!");
//             } else if (error.response && error.response.status === 400) {
//                 alert(
//                     "Password should contain: \n  Minimum 8 characters. \n  1 number, 1 symbol and 1 uppercase letter."
//                 );
//             } else {
//                 console.error("Error:", error);
//             }
//         }
//     };

//     const handleGoogleSignIn = async () => {
//         try {
//             const provider = new GoogleAuthProvider();
//             const result = await signInWithPopup(auth, provider);

//             const email = result.user.email;
//             const name = result.user.displayName;
//             const contact = result.user.phoneNumber;
//             const profilePic = result.user.photoURL;

//             localStorage.setItem("email", email);
//             localStorage.setItem("userName", name);
//             localStorage.setItem("contact", contact);
//             localStorage.setItem("userProfileImage", profilePic);

//             const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
//             console.log(bgimagenameURL);
//             const response2 = await axios.get(bgimagenameURL);

//             if (response2.data.bgimageData) {
//                 setbgImageData(response2.data.bgimageData);
//                 localStorage.setItem("userBGImage", response2.data.bgimageData);
//                 console.log(bgimageData);
//             }

//             window.location.reload();

//             console.log("User signed in successfully");
//             window.location.reload();
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     const handleMicrosoftSignIn = async () => {
//         try {
//             const provider = new OAuthProvider("microsoft.com");
//             provider.addScope("user.read");

//             provider.setCustomParameters({
//                 prompt: "consent",
//             });

//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;

//             const email = user.email;
//             const name = user.displayName;
//             const contact = user.phoneNumber;
//             const profilePic = user.photoURL;

//             localStorage.setItem("email", email);
//             localStorage.setItem("userName", name);
//             localStorage.setItem("contact", contact);
//             localStorage.setItem("userProfileImage", profilePic);

//             const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
//             console.log(bgimagenameURL);
//             const response2 = await axios.get(bgimagenameURL);

//             if (response2.data.bgimageData) {
//                 setbgImageData(response2.data.bgimageData);
//                 localStorage.setItem("userBGImage", response2.data.bgimageData);
//                 console.log(bgimageData);
//             }

//             window.location.reload();
//             console.log("User signed in successfully");

//             console.log("User signed in successfully with Microsoft");
//         } catch (error) {
//             console.error("Error signing in with Microsoft:", error);
//         }
//     };

//     const handleFacebookSignIn = async () => {
//         try {
//             const provider = new FacebookAuthProvider();
//             const result = await signInWithPopup(auth, provider);

//             const email = result.user.email;
//             const name = result.user.displayName;
//             const contact = result.user.phoneNumber;
//             const profilePic = result.user.photoURL;

//             localStorage.setItem("email", email);
//             localStorage.setItem("userName", name);
//             localStorage.setItem("contact", contact);
//             localStorage.setItem("userProfileImage", profilePic);

//             const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
//             console.log(bgimagenameURL);
//             const response2 = await axios.get(bgimagenameURL);

//             if (response2.data.bgimageData) {
//                 setbgImageData(response2.data.bgimageData);
//                 localStorage.setItem("userBGImage", response2.data.bgimageData);
//                 console.log(bgimageData);
//             }

//             window.location.reload();
//             console.log("User signed in successfully with Facebook");
//         } catch (error) {
//             console.error("Error signing in with Facebook:", error);
//         }
//     };

//     const handleTwitterSignIn = async () => {
//         try {
//             const provider = new TwitterAuthProvider();
//             const result = await signInWithPopup(auth, provider);
//             const credential = TwitterAuthProvider.credentialFromResult(result);
//             const user = result.user;

//             if (user) {
//                 // User is already signed in
//                 try {
//                     // Try to link the Twitter account
//                     await linkWithCredential(user, credential);
//                     console.log("Twitter account linked successfully");

//                     const email = user.email;
//                     const name = user.displayName;
//                     const contact = user.phoneNumber || "";
//                     const profilePic = user.photoURL || "";

//                     localStorage.setItem("email", email);
//                     localStorage.setItem("userName", name);
//                     localStorage.setItem("contact", contact);
//                     localStorage.setItem("userProfileImage", profilePic);

//                     window.location.reload();
//                     console.log("User signed in successfully with Twitter");
//                 } catch (error) {
//                     if (error.code === "auth/provider-already-linked") {
//                         // Twitter account is already linked to another account
//                         console.error(
//                             "Twitter account is already linked to another account."
//                         );

//                         // Attempt to unlink the Twitter account
//                         try {
//                             await unlink(user, "twitter.com");
//                             console.log(
//                                 "Twitter account unlinked successfully"
//                             );

//                             // Link the Twitter account again
//                             await linkWithCredential(user, credential);
//                             console.log("Twitter account linked successfully");

//                             const email = user.email;
//                             const name = user.displayName;
//                             const contact = user.phoneNumber || "";
//                             const profilePic = user.photoURL || "";

//                             localStorage.setItem("email", email);
//                             localStorage.setItem("userName", name);
//                             localStorage.setItem("contact", contact);
//                             localStorage.setItem(
//                                 "userProfileImage",
//                                 profilePic
//                             );

//                             window.location.reload();
//                             console.log(
//                                 "User signed in successfully with Twitter"
//                             );
//                         } catch (unlinkError) {
//                             console.error(
//                                 "Error unlinking Twitter account:",
//                                 unlinkError
//                             );
//                         }
//                     } else {
//                         console.error("Error linking Twitter account:", error);
//                     }
//                 }
//             } else {
//                 // User is not signed in
//                 // Proceed with the sign-in flow
//                 const email = result.additionalUserInfo?.profile?.email;
//                 const name = result.additionalUserInfo?.profile?.name;
//                 const contact = result.additionalUserInfo?.profile?.contact;
//                 const profilePic =
//                     result.additionalUserInfo?.profile?.profilePic;

//                 localStorage.setItem("email", email);
//                 localStorage.setItem("userName", name);
//                 localStorage.setItem("contact", contact);
//                 localStorage.setItem("userProfileImage", profilePic);

//                 const bgimagenameURL = `http://localhost:55555/api/profilebgpic/${email}`;
//                 console.log(bgimagenameURL);

//                 // Error handling for API call
//                 try {
//                     const response2 = await axios.get(bgimagenameURL);
//                     if (response2.data.bgimageData) {
//                         setbgImageData(response2.data.bgimageData); // Assuming state variable for background image
//                         localStorage.setItem(
//                             "userBGImage",
//                             response2.data.bgimageData
//                         );
//                     }
//                 } catch (error) {
//                     console.error(
//                         "Error fetching user background image:",
//                         error
//                     );
//                 }

//                 window.location.reload();
//                 console.log("User signed in successfully with Twitter");
//             }
//         } catch (error) {
//             console.error("Error signing in with Twitter:", error);
//         }
//     };

//     const handleGitHubSignIn = async () => {
//         try {
//             const provider = new GithubAuthProvider();
//             const result = await signInWithPopup(auth, provider);
//             const credential = GithubAuthProvider.credentialFromResult(result);
//             const user = result.user;

//             if (user) {
//                 // User is already signed in
//                 try {
//                     // Try to link the GitHub account
//                     await linkWithCredential(user, credential);
//                     console.log("GitHub account linked successfully");

//                     // Retrieve and store user information
//                     const email = user.email;
//                     const name = user.displayName;
//                     const profilePic = user.photoURL || "";

//                     localStorage.setItem("email", email);
//                     localStorage.setItem("userName", name);
//                     localStorage.setItem("userProfileImage", profilePic);

//                     window.location.reload();
//                     console.log("User signed in successfully wht GitHub");
//                 } catch (error) {
//                     if (error.code === "auth/provider-already-linked") {
//                         // GitHub account is already linked to another account
//                         console.error(
//                             "GitHub account is already linked to another account."
//                         );

//                         // Attempt to unlink the GitHub account
//                         try {
//                             await unlink(user, "github.com");
//                             console.log("GitHub account unlinked successfully");

//                             // Link the GitHub account again
//                             await linkWithCredential(user, credential);
//                             console.log("GitHub account linked successfully");

//                             // Retrieve and store user information
//                             const email = user.email;
//                             const name = user.displayName;
//                             const profilePic = user.photoURL || "";

//                             localStorage.setItem("email", email);
//                             localStorage.setItem("userName", name);
//                             localStorage.setItem(
//                                 "userProfileImage",
//                                 profilePic
//                             );

//                             window.location.reload();
//                             console.log(
//                                 "User signed in successfully wht GitHub"
//                             );
//                         } catch (unlinkError) {
//                             console.error(
//                                 "Error unlinking GitHub account:",
//                                 unlinkError
//                             );
//                         }
//                     } else {
//                         console.error("Error linking GitHub account:", error);
//                     }
//                 }
//             } else {
//                 // User is not signed in
//                 // Proceed with the sign-in flow
//                 const email = result.additionalUserInfo?.profile?.email;
//                 const name = result.additionalUserInfo?.profile?.name;
//                 const profilePic =
//                     result.additionalUserInfo?.profile?.profilePic;

//                 localStorage.setItem("email", email);
//                 localStorage.setItem("userName", name);
//                 localStorage.setItem("userProfileImage", profilePic);

//                 window.location.reload();
//                 console.log("User signed in successfully wht GitHub");
//             }
//         } catch (error) {
//             console.error("Error signing in with GitHub:", error);
//         }
//     };

//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             setAuthe(true);
//             window.localStorage.setItem("auth", "true");
//             user.getIdToken().then((token) => {
//                 setToken(token);
//             });
//         }
//     });

//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 <h2 className="montserrat-regular-400 mb-5 d-flex justify-content-center">
//                     <b>Let's Go!</b>
//                 </h2>
//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <label htmlFor="" style={{ fontSize: "0.75rem" }}>
//                         Name
//                     </label>
//                     <input
//                         type="email"
//                         placeholder="Enter your full name"
//                         value={email}
//                         onChange={handleChange}
//                         className="rounded"
//                         style={styles.input}
//                         required
//                     />
//                 </form>

//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <label htmlFor="" style={{ fontSize: "0.75rem" }}>
//                         Contact
//                     </label>
//                     <input
//                         type="email"
//                         placeholder="Enter your contact number"
//                         value={email}
//                         onChange={handleChange}
//                         className="rounded"
//                         style={styles.input}
//                         required
//                     />
//                 </form>

//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <label htmlFor="" style={{ fontSize: "0.75rem" }}>
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={handleChange}
//                         className="rounded"
//                         style={styles.input}
//                         required
//                     />
//                 </form>

//                 <form
//                     onSubmit={handleSubmit}
//                     style={styles.form}
//                     className="my-2"
//                 >
//                     <label htmlFor="" style={{ fontSize: "0.75rem" }}>
//                         Password
//                     </label>
//                     <input
//                         type="email"
//                         placeholder="Enter your password"
//                         value={email}
//                         onChange={handleChange}
//                         className="rounded"
//                         style={styles.input}
//                         required
//                     />
//                 </form>

//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <button
//                         type="submit"
//                         className="rounded"
//                         style={styles.submitButton}
//                     >
//                         Log In
//                     </button>
//                     <div className="social-icons d-flex justify-content-center">
//                         <Button
//                             className={`btn btn-light mx-1 text-${
//                                 props.mode === "light" ? "white" : "black"
//                             } btn`}
//                             onClick={handleGoogleSignIn}
//                         >
//                             <i className="bi bi-google"></i>
//                         </Button>
//                         <Button
//                             className={`btn btn-light mx-1 text-${
//                                 props.mode === "light" ? "white" : "black"
//                             } btn`}
//                             onClick={handleFacebookSignIn}
//                         >
//                             <i className="bi bi-facebook"></i>
//                         </Button>
//                         <Button
//                             className={`btn btn-light mx-1 text-${
//                                 props.mode === "light" ? "white" : "black"
//                             } btn`}
//                             onClick={handleMicrosoftSignIn}
//                         >
//                             <i className="bi bi-microsoft"></i>
//                         </Button>
//                         <Button
//                             className={`btn btn-light mx-1 text-${
//                                 props.mode === "light" ? "white" : "black"
//                             } btn`}
//                             onClick={handleTwitterSignIn}
//                         >
//                             <i className="bi bi-twitter-x"></i>
//                         </Button>
//                         <Button
//                             className={`btn btn-light mx-1 text-${
//                                 props.mode === "light" ? "white" : "black"
//                             } btn`}
//                             onClick={handleGitHubSignIn}
//                         >
//                             <i className="bi bi-github"></i>
//                         </Button>
//                     </div>
//                 </form>
//                 <div className="d-flex justify-content-center mt-2">
//                     <Link
//                         className="forgot-password-link text-primary"
//                         style={{ textDecoration: "none" }}
//                         to="/forgot-password"
//                     >
//                         Don't have an account? Sign Up!
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f5f5f5",
//     },
//     card: {
//         width: "400px",
//         padding: "40px",
//         backgroundColor: "#ffffff",
//         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//         borderRadius: "8px",
//     },
//     description: {
//         fontSize: "16px",
//         color: "#666666",
//         marginBottom: "30px",
//         textAlign: "center",
//     },
//     form: {
//         display: "flex",
//         flexDirection: "column",
//     },
//     input: {
//         padding: "12px 16px",
//         marginBottom: "20px",
//         border: "1px solid #cccccc",
//         borderRadius: "4px",
//         fontSize: "16px",
//     },
//     submitButton: {
//         padding: "12px 16px",
//         backgroundColor: "#007bff",
//         color: "#ffffff",
//         border: "none",
//         borderRadius: "4px",
//         fontSize: "16px",
//         cursor: "pointer",
//         transition: "background-color 0.3s ease",
//     },
//     backLink: {
//         marginTop: "20px",
//         textAlign: "center",
//         display: "block",
//         textDecoration: "none",
//         color: "#007bff",
//     },
// };

// export default DummyPage;
