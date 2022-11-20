const jwt = require('jsonwebtoken');
const { User } = require('../models/');
async function verifyToken(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ username: verified.username });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
}
module.exports = {
  verifyToken,
};
