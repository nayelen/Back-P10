const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  img: { type: String, trim: true, required: false },
  place: { type: String, required: true },
  description: { type: String, required: true },
  validating: { type: Boolean }
}, {
  timestamps: true,
  collection: "events",
});

const Event = mongoose.model("events", eventSchema, "events");
module.exports = Event;