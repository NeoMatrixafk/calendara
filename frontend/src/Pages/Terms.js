import React from "react";

const Terms = (props) => {
    return (
        <>
            <div
                className={`container my-5 text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                <h1>Terms & Conditions</h1>
                <h4 className="my-5">
                    Terms & Conditions calendara Digital Goods License Agreement
                    Effective January 15, 2024
                </h4>
                <ol className="my-5">
                    <li>
                        <b>Acceptance of Terms:</b> By accessing and using the
                        calendara website (hereinafter referred to as
                        "calendara," "we," or "us"), you agree to comply with
                        and be bound by the following terms and conditions. If
                        you do not agree with these terms, please refrain from
                        using our services.
                    </li>
                    <li>
                        <b>Use of the Service:</b> calendara provides users with
                        event tracking and management services. You agree to use
                        the services only for lawful purposes and in accordance
                        with these terms. You are solely responsible for
                        maintaining the confidentiality of your account
                        information.
                    </li>
                    <li>
                        <b>User Content:</b> By submitting content, including
                        but not limited to event details and descriptions, you
                        grant calendara a non-exclusive, royalty-free, worldwide
                        license to use, modify, and display the content for the
                        purpose of providing and improving our services.
                    </li>
                    <li>
                        <b>Privacy Policy:</b> Your use of calendara is also
                        governed by our Privacy Policy, which outlines how we
                        collect, use, and protect your personal information. By
                        using calendara, you consent to the practices described
                        in the Privacy Policy
                    </li>
                    <li>
                        <b>Intellectual Property:</b> calendara and its original
                        content, features, and functionality are owned by
                        calendara and are protected by international copyright,
                        trademark, patent, trade secret, and other intellectual
                        property or proprietary rights laws.
                    </li>
                    <li>
                        <b>Termination of Service:</b> We reserve the right to
                        terminate or suspend your account and access to
                        calendara, with or without cause and with or without
                        notice, for any conduct that we, in our sole discretion,
                        believe violates these Terms and Conditions or is
                        harmful to other users or third parties.
                    </li>
                    <li>
                        <b>Modifications to Terms:</b> calendara reserves the
                        right to modify or replace these Terms and Conditions at
                        any time. Updated versions will be effective immediately
                        upon posting. It is your responsibility to review these
                        terms periodically.
                    </li>
                    <li>
                        <b>Limitation of Liability:</b> In no event shall
                        calendara, its officers, directors, employees, or
                        agents, be liable for any indirect, incidental, special,
                        consequential, or punitive damages, or any loss of
                        profits or revenues, whether incurred directly or
                        indirectly, or any loss of data, use, goodwill, or other
                        intangible losses.
                    </li>
                    <li>
                        <b>Governing Law:</b> These Terms and Conditions are
                        governed by and construed in accordance with the laws of
                        India, without regard to its conflict of law principles.
                    </li>
                    <li>
                        <b>Contact Information:</b> If you have any questions or
                        concerns regarding these Terms and Conditions, you can
                        contact us at{" "}
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
                    </li>
                </ol>
                <h3>
                    By using calendara, you acknowledge that you have read and
                    understood these Terms and Conditions and agree to be bound
                    by them.
                </h3>
            </div>
        </>
    );
};

export default Terms;
