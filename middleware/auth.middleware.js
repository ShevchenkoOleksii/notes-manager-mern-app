const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return await res.status(400).json({
        message: 'no authorization!',
      });
    }

    const decoded = await jwt.decode(token, config.get('jwtSecret'));

    if (!decoded) {
      return await res.status(400).json({
        message: 'invalid token!',
      });
    }

    const userId = decoded.userId;
    const user = await User.findOne({_id: userId});

    if (!user) {
      return await res.status(400).json({
        message: 'user not found!',
      });
    }

    req.decoded = decoded;
    req.user = user;

    next();
  } catch (e) {
    await res.status(400).json({
      message: `${e.message}`,
    });
    // await res.status(400).json({
    //   message: 'error! no authorization!',
    // });
  }
};
