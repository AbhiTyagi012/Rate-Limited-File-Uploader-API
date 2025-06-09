const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  timeSlot: { type: String, required: true },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);