const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({
    admin: {type: String},
    title: {type: String, required: [true, "Please write a title for your event"]},
    start: {
     type: Date,
     required: [true, "Please Insert The Start of your event" ],
     min: [new Date(), "can't be before now!!"],
    },
    end: {
     type: Date,
     //setting a min function to accept any date one hour ahead of start
     required: [true, "Please Insert The End of your event" ],
     min: [function(){
       const date = new Date(this.start)
       const validDate = new Date(date.setHours(date.getHours()+1)) 
       return validDate
     },"Event End must be at least one hour a head of event time"],
    default: function(){
      const date = new Date(this.start)
      return date.setDate(date.getDate()+1)
    },
    },
    describe: { type: String},
    color: { type: String, default: '#3174ad' },
})


module.exports = mongoose.model("Event", EventSchema)