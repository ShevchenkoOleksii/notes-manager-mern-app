const User = require('../models/User');
const config = require('config');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return await res.status(400).json({
        message: `Login data is invalid`,
      });
    }

    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: 'Invalid password, try again',
      });
    }

    const jwtToken = jwt.sign(
        {userId: user.id},
        process.env.jwtSecret,
        // config.get('jwtSecret'),
        {expiresIn: '1h'},
    );

    await res.json({
      jwt_token: jwtToken,
      userId: user.id,
      message: 'success!',
    });
  } catch (e) {
    await res.status(500).json({
      message: 'Internal server error!',
    });
  }
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return await res.status(400).json({
        message: `registration data is invalid`,
      });
    }

    const {username, password} = req.body;
    const candidate = await User.findOne({username});

    if (candidate) {
      return await res.status(400).json({
        message: `${username} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: hashedPassword,
      createdDate: Date.now(),
    });

    await user.save();

    await res.status(200).json({
      message: `${username} has been created successfully!`,
    });
  } catch (e) {
    await res.status(500).json({
      message: 'Internal server error!',
    });
  }
};

module.exports = {
  login,
  register,
};
