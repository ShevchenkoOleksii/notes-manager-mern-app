const {Router} = require('express');
const router = new Router();
const auth = require('../middleware/auth.middleware');

const {sendMessage, getMessages} = require('../controllers/message.controller');

router.post('/send', auth, sendMessage);
router.get('/', auth, getMessages);

module.exports = router;