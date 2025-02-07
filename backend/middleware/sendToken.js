const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Options for cookie
  const cookieOptions = {
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    httpOnly: true, // more secure, server-side only
    sameSite: 'None', // allows cross-origin cookies
    secure: true, // ensures cookies are sent over HTTPS
  };

  // Send token in cookie
  res.cookie('stockify-token', token, cookieOptions);

  // Send response with token and user info
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
