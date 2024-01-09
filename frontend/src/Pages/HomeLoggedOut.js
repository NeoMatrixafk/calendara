import React from "react";

import HomeConclusion from "../Components/HomeLoggedOut/HomeConclusion";
import HomeServices from "../Components/HomeLoggedOut/HomeServices";
import HomeFAQ from "../Components/HomeLoggedOut/HomeFAQ";
import HomeAd from "../Components/HomeLoggedOut/HomeAd";
import HomeMain from "../Components/HomeLoggedOut/HomeMain";

const HomeLoggedOut = (props) => {
    console.log(props.mode);
    return (
        <>
            <div className="home-page">
                <div className="container my-5">
                    <HomeMain mode={props.mode} />

                    <HomeAd mode={props.mode} />

                    <HomeFAQ mode={props.mode} />

                    <HomeServices mode={props.mode} />

                    <HomeConclusion mode={props.mode} />
                </div>
            </div>
        </>
    );
};

export default HomeLoggedOut;
