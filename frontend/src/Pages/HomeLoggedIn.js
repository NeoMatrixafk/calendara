import React from "react";

import HomeServices from "../Components/HomeLoggedIn/HomeServices";
import HomeFAQ from "../Components/HomeLoggedIn/HomeFAQ";
import HomeAd from "../Components/HomeLoggedIn/HomeAd";
import HomeMain from "../Components/HomeLoggedIn/HomeMain";

const HomeLoggedIn = (props) => {
    console.log(props.mode);
    return (
        <>
            <div className="home-page">
                <div className="container my-5">
                    <HomeMain mode={props.mode} />

                    <HomeAd mode={props.mode} />

                    <HomeFAQ mode={props.mode} />

                    <HomeServices mode={props.mode} />
                </div>
            </div>
        </>
    );
};

export default HomeLoggedIn;
