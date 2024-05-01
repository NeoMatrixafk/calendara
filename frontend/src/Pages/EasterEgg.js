import { useEffect, useRef } from "react";
import eeImage from "../Components/EE/eeImage.jpeg";
import eeSound from "../Components/EE/eeSound.m4a";

const EasterEgg = (props) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, []);

    return (
        <>
            <h1
                className={`my-5 d-flex justify-content-center text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                What is bro doing here? 🗣️⁉️
            </h1>
            <div className="d-flex justify-content-center align-items-center">
                <img
                    src={eeImage}
                    alt=""
                    style={{ width: "25rem", borderRadius: "7.5rem" }}
                />
            </div>
            <p
                className={`my-5 d-flex justify-content-center text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                <audio ref={audioRef} controls autoPlay>
                    <source src={eeSound} type="audio/mpeg" />
                    What the sigma?
                </audio>
            </p>
        </>
    );
};

export default EasterEgg;
