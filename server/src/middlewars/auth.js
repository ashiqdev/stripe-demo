const jwt = require('jsonwebtoken');

const jwtDecoder = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
};

module.exports = { jwtDecoder };
