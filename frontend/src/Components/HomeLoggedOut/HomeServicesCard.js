const HomeServicesCard = (props) => {
    return (
        <>
            <div
                className={`card my-4 border-secondary ${
                    props.mode === "light" ? "-subtle" : ""
                }`}
                style={{ width: "30rem", overflow: "auto" }}
            >
                <img
                    src={props.service.imgUrl}
                    className="card-img-top"
                    alt="..."
                />
                <div
                    className="card-body"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "white" : "#4E5259",
                    }}
                >
                    <p
                        className={`card-text text-${
                            props.mode === "light" ? "black" : "white"
                        }`}
                    >
                        {props.service.text}
                    </p>
                </div>
            </div>
        </>
    );
};

export default HomeServicesCard;
