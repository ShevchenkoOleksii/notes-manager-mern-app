const {Router} = require('express');
const router = new Router();
const auth = require('../middleware/auth.middleware');

const {addFriend, likeFriend, changeFavorite, removeFriend, updateNotes, getFriends, getFriend} = require('../controllers/friend.controller');

router.get('/', auth, getFriends);
router.get('/:id', auth, getFriend);
router.post('/add', auth, addFriend);
router.patch('/like/:id', auth, likeFriend);
router.patch('/favorite/:id', auth, changeFavorite);
router.patch('/update/:id', auth, updateNotes);
router.delete('/delete/:id', auth, removeFriend);

module.exports = router;