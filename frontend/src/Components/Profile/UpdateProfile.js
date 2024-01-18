import React, { useState } from "react";

const UpdateProfile = (props) => {
    const [imageData, setImageData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const data = event.target.result;
                setImageData(data);
                setImagePreview(data); // Set image preview
            };

            reader.readAsDataURL(file);
        }
    };

    const storeImage = () => {
        if (imageData) {
            localStorage.setItem("userProfileImage", imageData);
            setSuccessMessage("Image successfully updated!");
        }
    };

    return (
        <>
            <div className="container my-5">
                <h3
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Update Profile Picture
                </h3>
                <div className="container mt-3" style={{ width: "50%" }}>
                    <div className="input-group mb-3">
                        <input
                            type="file"
                            className={`form-control ${
                                props.mode === "light" ? "" : "border-secondary"
                            }`}
                            id="inputGroupFile"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                                backgroundColor:
                                    props.mode === "light" ? "" : "#4d4d4d",
                                WebkitTextFillColor:
                                    props.mode === "light"
                                        ? "black"
                                        : "#e6e6e6",
                            }}
                        />
                    </div>
                    {imagePreview && (
                        <div className="mt-5 d-flex justify-content-center">
                            <p
                                className={`m-0 d-flex align-items-center me-5 text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                                style={{ fontSize: "1.5rem" }}
                            >
                                Selected Image Preview:
                            </p>
                            <img
                                src={imagePreview}
                                alt="Selected Preview"
                                style={{
                                    width: "14rem",
                                    borderRadius: "7rem",
                                }}
                            />
                        </div>
                    )}
                    {successMessage && (
                        <div
                            className={`alert alert-${
                                props.mode === "light" ? "primary" : "warning"
                            } mt-3`}
                            role="alert"
                        >
                            {successMessage}
                        </div>
                    )}
                </div>
                <div className="container d-flex justify-content-center mt-5">
                    <button
                        className={`btn btn-${
                            props.mode === "light" ? "primary" : "warning"
                        }`}
                        onClick={storeImage}
                    >
                        Update Image
                    </button>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
