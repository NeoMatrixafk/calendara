import React from "react";

import ProfileLoggedIn from "../Components/Profile/ProfileLoggedIn";

const Profile = (props) => {
    const userName = "Ayush Sharma";
    const userContact = "9876543210";
    const userEmail = "dictator@calendara.com";
    const userBadge = "touch grass";

    const defaultProfileImg = "/Images/Misc/defaultProfile.jpg";

    return (
        <>
            <div className="container my-5">
                <div className="">
                    <h1
                        className={`quicksand-medium-500 text-${
                            props.mode === "dark" ? "light" : "dark"
                        }`}
                    >
                        Your Profile
                    </h1>

                    <ProfileLoggedIn
                        mode={props.mode}
                        userBadge={userBadge}
                        userContact={userContact}
                        userEmail={userEmail}
                        userName={userName}
                        defaultProfileImg={defaultProfileImg}
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;
