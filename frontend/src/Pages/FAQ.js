import React from "react";

const FAQ = (props) => {
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
            answer: "Currently, calendara is optimized for desktop use. However, we are actively working on a mobile version using React Native to provide a seamless mobile experience. The mobile version will be available soon.",
        },
        {
            question: "How do I create a new event on calendara?",
            answer: "Creating a new event on calendara is easy. Simply navigate to the 'Add Event' section, and you'll find a user-friendly form where you can input details such as the event name, date, color theme, and description. Once you've filled in the necessary information, click 'Create' and your event will be added to your calendar.",
        },
        {
            question: "Can I set reminders for my events?",
            answer: "Yes, you can set reminders for your events on calendara. During the event creation process, you'll have the option to configure reminder preferences, including the timing and method of notification. calendara will then send you timely reminders via email as the event approaches.",
        },
        {
            question: "How can I edit an existing event?",
            answer: "To edit an existing event, go to the 'Events' section and select the event you wish to modify. Click on the 'Edit' button, and you'll be able to update details such as the event name, date, and description. Once you've made the changes, save them, and your event will be updated.",
        },
        {
            question: "Is my personal information secure on calendara?",
            answer: " Yes, calendara prioritizes the security of your personal information. We use industry-standard encryption and security measures to protect your data. Your information is stored securely, and we do not share it with third parties.",
        },
        {
            question: "Can I delete an event if I no longer need it?",
            answer: "Absolutely. If you no longer need an event, you can delete it from your calendar. Simply go to the 'Events' section, select the event you want to remove, and click on the event and then on 'Delete' option. Confirm the deletion, and the event will be removed from your calendar.",
        },
        {
            question: "How can I contact calendara support for assistance?",
            answer: "If you have any questions or need assistance, you can reach out to our support team at contact.calendara@gmail.com or visit our Contact Us. We're here to help and ensure you have a smooth experience with calendara.",
        },
    ];

    return (
        <div className="container my-5">
            <h1
                className={`text-${props.mode === "light" ? "black" : "white"}`}
            >
                FAQs
            </h1>
            <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
            >
                {faqData.map((faq, index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button ${
                                    props.mode === "light"
                                        ? ""
                                        : "dark-dropdown"
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
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                >
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
