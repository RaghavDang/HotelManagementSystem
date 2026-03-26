const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  hotelId: { type: mongoose.Types.ObjectId, ref: "Hotel" },
  addedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
