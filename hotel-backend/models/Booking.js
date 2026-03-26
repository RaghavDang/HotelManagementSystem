const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  hotelId: { type: mongoose.Types.ObjectId, ref: "Hotel" },

  fromDate: Date,
  toDate: Date,
  roomType: String,
  description: String,

  status: { type: String, default: "booked" }, // booked / cancelled
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
