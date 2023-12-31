const HomeAccordion = (props) => {
    const faqData = [
        { question: "FAQ #1", answer: "Answer to the FAQ" },
        { question: "FAQ #2", answer: "Answer to the FAQ" },
        { question: "FAQ #3", answer: "Answer to the FAQ" },
    ];

    return (
        <div className="accordion accordion-flush" id="accordionFlushExample">
            {faqData.map((faq, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${
                                props.mode === "light" ? "" : "dark-dropdown"
                            } text-${
                                props.mode === "light" ? "black" : "white"
                            } collapsed`}
                            style={{
                                backgroundColor:
                                    props.mode === "light"
                                        ? "white"
                                        : "#36393e",
                            }}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse-${index}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapse-${index}`}
                        >
                            {faq.question}
                        </button>
                    </h2>
                    <div
                        id={`flush-collapse-${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div
                            className="accordion-body"
                            style={{
                                backgroundColor:
                                    props.mode === "light"
                                        ? "white"
                                        : "#36393e",
                            }}
                        >
                            <p
                                className={`text-${
                                    props.mode === "light" ? "black" : "white"
                                }`}
                            >
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeAccordion;
