const {Router} = require('express');
const router = new Router();
const auth = require('../middleware/auth.middleware');

const {
  createNote,
  getNotes,
  getNote,
  changeCurrentNote,
  changeNoteCompleted,
  removeNote,
} = require('../controllers/note.controller');

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.get('/:id', auth, getNote);
router.put('/:id', auth, changeCurrentNote);
router.patch('/:id', auth, changeNoteCompleted);
router.delete('/:id', auth, removeNote);

module.exports = router;
