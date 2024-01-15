import React from "react";

const UserPolicy = (props) => {
    return (
        <div
            className={`container my-5 text-${
                props.mode === "light" ? "black" : "white"
            }`}
        >
            <h1>User Policy for Calendara</h1>
            <p className="mt-3">Effective Date: January 15, 2024</p>

            <p>
                Welcome to Calendara! This User Policy outlines the terms and
                conditions for using our website and services. By accessing or
                using Calendara, you agree to the terms stated in this User
                Policy.
            </p>

            <h4>1. User Responsibilities</h4>
            <p>
                As a user of Calendara, you are responsible for maintaining the
                confidentiality of your account credentials and ensuring that
                your account information is accurate and up-to-date.
            </p>

            <h4>2. Acceptable Use</h4>
            <p>
                Users are expected to use Calendara for lawful and ethical
                purposes. Any misuse or violation of our terms may result in the
                suspension or termination of your account.
            </p>

            <h4>3. Prohibited Activities</h4>
            <p>
                The following activities are strictly prohibited on Calendara:
            </p>
            <ul>
                <li>Unauthorized access or use of other users' accounts.</li>
                <li>
                    Attempting to disrupt or compromise the security of
                    Calendara.
                </li>
                <li>
                    Any form of harassment, abuse, or violation of the rights of
                    others.
                </li>
            </ul>

            <h4>4. Termination of Account</h4>
            <p>
                Calendara reserves the right to terminate or suspend user
                accounts that violate our User Policy or for any other reason
                deemed necessary to protect the integrity and security of our
                platform.
            </p>

            <h4>5. Changes to this User Policy</h4>
            <p>
                Calendara reserves the right to update or modify this User
                Policy at any time. Users will be notified of significant
                changes through their registered email address or via an
                announcement on our website.
            </p>

            <h4>6. Contact Information</h4>
            <p>
                If you have any questions or concerns about this User Policy,
                please contact us at{" "}
                <a
                    href="mailto:user@example.com"
                    style={{
                        textDecoration: "none",
                    }}
                    className={`text-${
                        props.mode === "light" ? "primary" : "danger"
                    }`}
                >
                    contact.calendara@gmail.com
                </a>
                .
            </p>

            <h3 className="my-5">
                By using Calendara, you acknowledge that you have read and
                understood this User Policy and agree to abide by its terms and
                conditions.
            </h3>
        </div>
    );
};

export default UserPolicy;
