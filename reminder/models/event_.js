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
        required: [true, "Please Insert The End of your event"],
        default: function () {
            const date = new Date(this.start);
        },
    },
    describe: { type: String },
    color: { type: String, default: "#2196f3" },
    allDay: { type: Boolean, default: true },
    status: { type: String, default: "Unresolved" },
    uploaded: { type: Boolean, default: false },
    reminder: { type: Boolean, default: true }

});


module.exports = mongoose.model("Event", EventSchema);