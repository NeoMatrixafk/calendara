import React from "react";

const PrivacyPolicy = (props) => {
    return (
        <div
            className={`container my-5 text-${
                props.mode === "light" ? " black" : "white"
            }`}
        >
            <h1>Privacy Policy for calendara</h1>
            <p className="mt-3">Effective Date: January 15, 2024</p>

            <p>
                Thank you for using calendara! This Privacy Policy explains how
                we collect, use, and protect your personal information when you
                use our website and services. By accessing or using calendara,
                you consent to the terms outlined in this Privacy Policy.
            </p>

            <h4>1. Information We Collect</h4>
            <p>
                calendara collects the following information for authentication
                and reminder purposes:
            </p>
            <ul>
                <li>
                    User Name: We collect your chosen username to personalize
                    your experience on calendara.
                </li>
                <li>
                    Email Address: Your email address is used for account
                    authentication, communication, and sending event-related
                    reminders.
                </li>
                <li>
                    Contact Information: We may collect your contact details to
                    enhance security measures and improve the reliability of our
                    reminder services.
                </li>
                <li>
                    Event-Related Data: calendara securely stores the data you
                    input regarding events, such as event names, dates, and
                    descriptions. This information is used exclusively for
                    providing our event tracking services.
                </li>
            </ul>

            <h4>2. How We Use Your Information</h4>
            <ul>
                <li>
                    Authentication: Your username, email, and contact
                    information are used to verify your identity and maintain
                    the security of your calendara account.
                </li>
                <li>
                    Communication: We use your email address to send important
                    notifications, reminders, and updates related to your events
                    and account.
                </li>
                <li>
                    Event-Related Services: The event-related data you provide
                    is utilized to offer you personalized event tracking
                    services. We do not use this data for any purpose other than
                    enhancing your calendara experience.
                </li>
            </ul>

            <h4>3. Data Security</h4>
            <p>
                calendara is committed to ensuring the security of your
                information. We employ industry-standard security measures to
                protect your data from unauthorized access, disclosure,
                alteration, and destruction. Our systems are designed to keep
                your personal and event-related information confidential and
                secure.
            </p>

            <h4>4. Data Sharing</h4>
            <p>
                We do not share your personal information or event-related data
                with any third-party websites or services. Your privacy is our
                priority, and we do not engage in the sale, trade, or transfer
                of your data to external entities.
            </p>

            <h4>5. Cookies and Tracking Technologies</h4>
            <p>
                calendara may use cookies and similar tracking technologies to
                enhance your user experience. These technologies help us
                understand how you interact with our website, but we do not use
                them to collect personally identifiable information.
            </p>

            <h4>6. Changes to this Privacy Policy</h4>
            <p>
                calendara reserves the right to update or modify this Privacy
                Policy at any time. We will notify you of significant changes
                through the email address associated with your account or
                through an announcement on our website.
            </p>

            <h4>7. Contact Information</h4>
            <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at{" "}
                <a
                    href="mailto:user@example.com"
                    style={{ textDecoration: "none" }}
                    className={`text-${
                        props.mode === "light" ? "primary" : "danger"
                    }`}
                >
                    contact.calendara@gmail.com
                </a>
                .
            </p>

            <h3 className="my-5">
                By using calendara, you acknowledge that you have read and
                understood this Privacy Policy and agree to the collection and
                use of your information as outlined herein.
            </h3>
        </div>
    );
};

export default PrivacyPolicy;
