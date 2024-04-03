const HomeAccordion = (props) => {
    const faqData = [
        {
            question: "What is the purpose of calendara?",
            answer: "calendara is designed to help users schedule, manage, and view events seamlessly. It allows you to create events, set details such as title, date, time, and location, and provides a convenient calendar view to keep track of your schedule.",
        },
        {
            question: "How do I set up event reminders for upcoming events?",
            answer: "To set up event reminders, simply create a new event or edit an existing one. During event creation or editing, you'll find an option to set a reminder. Enter the desired time for the reminder, and our system will notify you in advance of the scheduled event.",
        },
        {
            question: "Is the calendara accessible on mobile devices?",
            answer: "Currently, calendara is optimized for desktop use and mobile using the website/web-app. However, we are actively working on a mobile app using React Native to provide a seamless mobile experience. It will be available soon.",
        },
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
