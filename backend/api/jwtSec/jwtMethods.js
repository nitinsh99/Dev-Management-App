const jwt = require("jsonwebtoken");
exports.jwtTokenGenerator = userId => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_PASS, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
exports.options = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIES_EXPIRE * 24 * 60 * 60 * 1000
  ), //times 24 hours times 60 min * 60 seconds * 1000 ms to get to miliseconds
  httpOnly: true
};
