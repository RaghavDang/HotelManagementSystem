const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  preferences: {
    defaultAmount: { type: Number, default: 0 },
    defaultLocation: { type: String, default: "" }
  }
});

module.exports = mongoose.model("User", userSchema);
