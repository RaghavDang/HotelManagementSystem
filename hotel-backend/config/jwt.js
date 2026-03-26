const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email
    },
    SECRET,
    { expiresIn: '1d' }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
