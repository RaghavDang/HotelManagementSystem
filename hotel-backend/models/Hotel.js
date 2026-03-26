const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
  price: Number,
  roomType: String,
  features: [String],
  description: String,
  images: [String]
});

module.exports = mongoose.model("Hotel", hotelSchema);
