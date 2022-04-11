const {Router} = require('express');
const router = new Router();
const {
  getUserProfile,
  changeUserPassword,
  removeUser,
  getAllUsers
} = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, getUserProfile);
router.get('/all', auth, getAllUsers);
router.delete('/', auth, removeUser);
router.patch('/', auth, changeUserPassword);

module.exports = router;
