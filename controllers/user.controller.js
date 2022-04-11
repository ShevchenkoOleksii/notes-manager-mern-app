const User = require('../models/User');
const bcrypt = require('bcrypt');
const {Types} = require('mongoose');

const getUserProfile = async (req, res) => {
  try {
    const user = await req.user;

    await res.json({
      user: {
        _id: user._id,
        username: user.username,
        createdDate: user.createdDate,
      },
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const user = await req.user;

    const {oldPassword, newPassword} = req.body;

    const checkPassword = await bcrypt.compare(oldPassword, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: 'invalid password, try again',
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);

    await user.save();

    await res.json({
      message: 'Success',
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await req.user;
    await User.findOneAndRemove({_id: user._id});

    await res.json({
      message: `${user.username} has been removed successfully!`,
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await req.user;
    const allUsers1 = await User.find({});
    const allUsers = allUsers1.filter(item => !item._id.equals(user._id));

    await res.json({
      allUsers,
      message: `Success!`,
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

module.exports = {
  getUserProfile,
  changeUserPassword,
  removeUser,
  getAllUsers
};
