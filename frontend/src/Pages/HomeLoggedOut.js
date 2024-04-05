import React from "react";

import HomeConclusion from "../Components/HomeLoggedOut/HomeConclusion";
import HomeServices from "../Components/HomeLoggedOut/HomeServices";
import HomeFAQ from "../Components/HomeLoggedOut/HomeFAQ";
import HomeAd from "../Components/HomeLoggedOut/HomeAd";
import HomeMain from "../Components/HomeLoggedOut/HomeMain";
import HomeWelcome from "../Components/HomeLoggedOut/HomeWelcome";

const HomeLoggedOut = (props) => {
    console.log(props.mode);
    return (
        <>
            <div className="home-page">
                <div className="container">
                    <HomeMain mode={props.mode} />

                    <HomeWelcome mode={props.mode} />

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
