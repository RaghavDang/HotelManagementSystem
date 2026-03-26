const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require('../config/jwt');


exports.register = async (req, res) => {
  try {
    const { name, email, password, preferences } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role:"user",
      preferences: {
        defaultLocation: preferences?.defaultLocation || "",
        defaultAmount: preferences?.defaultAmount || 0
      }
    });

    res.json({ success: true, user });
  } catch (err) {
    res.json({ error: err.message });
  }
};


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.json({ msg: "Invalid email" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.json({ msg: "Invalid password" });

//     res.json({ success: true, user });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ success: false, msg: 'Invalid email' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ success: false, msg: 'Invalid password' });
  }

  const token = generateToken(user);

  res.json({
    success: true,
    token,
    user
  });
};




exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.params.userId || req.body.userId;
    
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await  bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.json({ success: false, message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ success: true, message: "Password updated successfully" });

  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { defaultLocation, defaultAmount } = req.body.preferences;


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "preferences.defaultLocation": defaultLocation,
          "preferences.defaultAmount": defaultAmount
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, msg: "User not found" });
    }

    return res.json({ success: true, user: updatedUser });

  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};
