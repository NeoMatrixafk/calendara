import { useState, useEffect } from "react";

const EasterEgg = (props) => {
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
        // Set autoplay to true when the component mounts
        setAutoplay(true);
    }, []);

    return (
        <>
            <h1
                className={`mt-5 d-flex justify-content-center text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                comgrats! u rchd the beloved pookie lebon page
            </h1>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <iframe
                    width="800"
                    height="450"
                    src={`https://www.youtube.com/embed/Tdi-B_8ScBE${
                        autoplay ? "?autoplay=1" : ""
                    }`}
                    frameBorder="0"
                    title="YouTube Video"
                    allowFullScreen
                ></iframe>
            </div>
            <p
                className={`my-5 d-flex justify-content-center text-${
                    props.mode === "light" ? "black" : "white"
                }`}
            >
                +5 calendara points for you 🥰📆
            </p>
        </>
    );
};

export default EasterEgg;
