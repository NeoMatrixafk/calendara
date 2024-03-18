const mongoose = require("mongoose");


//schema for events
const EventSchema = new mongoose.Schema({
    admin: { type: String },
    title: {
        type: String,
        required: [true, "Please write a title for your event"],
    },
    start: {
        type: Date,
        required: [true, "Please Insert The Start of your event"],
    },
    end: {
        type: Date,
        //setting a min function to accept any date one hour ahead of start
        required: [true, "Please Insert The End of your event"],
        min: [
            function () {
                const date = new Date(this.start);
                const validDate = new Date(
                    date.setMinutes(date.getMinutes() + 1)
                );
                return validDate;
            },
            "Event End must be at least one hour a head of event time",
        ],
        default: function () {
            const date = new Date(this.start);
            return date.setDate(date.getDate() + 1);
        },
    },
    describe: { type: String },
    color: { type: String, default: "#3174ad" },
    allDay: { type: Boolean, default: true}
});


module.exports = mongoose.model("Event", EventSchema);
