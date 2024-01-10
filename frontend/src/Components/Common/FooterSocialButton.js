import React from "react";

const FooterSocialButton = (props) => {
    return (
        <>
            <a
                className={`btn btn-${
                    props.mode === "light" ? "" : "dark"
                } btn-floating btn-shadow-white text-white m-1 ${
                    props.mode === "light" ? "footer-social-btn-light" : ""
                }`}
                href={`https://www.${props.site}.com/`}
                role="button"
            >
                <i className={`bi bi-${props.btn}`}></i>
            </a>
        </>
    );
};

export default FooterSocialButton;
