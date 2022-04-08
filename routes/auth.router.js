const {Router} = require('express');
const {check} = require('express-validator');
const router = new Router();
const {login, register} = require('../controllers/auth.controller');

router.post(
    '/register',
    [
      check('username', 'username is invalid').isLength({
        min: 3,
      }),
      check('password', 'password is invalid').isLength({
        min: 6,
      }),
    ],
    register,
);

router.post(
    '/login',
    [
      check('username', 'username must exist').isLength({
        min: 3,
      }),
      check('password', 'password is too short').isLength({
        min: 6,
      }),
    ],
    login,
);

module.exports = router;
