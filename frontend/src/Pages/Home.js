import React from "react";

import HomeConclusion from "../Components/Home/HomeConclusion";
import HomeServices from "../Components/Home/HomeServices";
import HomeFAQ from "../Components/Home/HomeFAQ";
import HomeAd from "../Components/Home/HomeAd";
import HomeMain from "../Components/Home/HomeMain";

const Home = (props) => {
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

export default Home;
