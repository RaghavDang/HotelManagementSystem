const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  console.log(authHeader.split(' ')[1]);
  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded; // { id, role, email }
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
