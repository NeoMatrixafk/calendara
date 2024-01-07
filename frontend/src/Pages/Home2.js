import React from "react";

import HomeConclusion from "../Components/Home2/HomeConclusion";
import HomeServices from "../Components/Home2/HomeServices";
import HomeFAQ from "../Components/Home2/HomeFAQ";
import HomeAd from "../Components/Home2/HomeAd";
import HomeMain from "../Components/Home2/HomeMain";

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
