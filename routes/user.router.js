const {Router} = require('express');
const router = new Router();
const {
  getUserProfile,
  changeUserPassword,
  removeUser,
} = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, getUserProfile);
router.delete('/', auth, removeUser);
router.patch('/', auth, changeUserPassword);

module.exports = router;
