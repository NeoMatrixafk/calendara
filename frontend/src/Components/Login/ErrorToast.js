import React from "react";
import { Toast } from "react-bootstrap";

const ErrorToast = (props) => {
    return (
        <>
            <div style={{ position: "relative", zIndex: 1 }}>
                <Toast
                    show={props.showToast}
                    onClose={props.toggleToast}
                    className="position-fixed bottom-0 end-0 m-3"
                    style={{
                        zIndex: 9999,
                        overflow: "auto",
                    }}
                >
                    <Toast.Header
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "" : "#474b52",
                        }}
                        className={`border-secondary ${
                            props.mode === "light" ? "-subtle" : ""
                        }`}
                    >
                        <strong
                            className={`me-auto text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            Login Error
                        </strong>
                    </Toast.Header>
                    <Toast.Body
                        style={{
                            backgroundColor:
                                props.mode === "light" ? "" : "#474b52",
                        }}
                        className={`me- text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        This feature will be added shortly.
                    </Toast.Body>
                </Toast>
            </div>
        </>
    );
};

export default ErrorToast;
