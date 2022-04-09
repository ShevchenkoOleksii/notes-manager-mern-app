const mongoose = require('mongoose');
const {Types} = mongoose;
const Note = require('../models/Note');


const createNote = async (req, res) => {
  try {
    const user = await req.user;
    const text = await req.body.text;

    if (!text) {
      return res.status(400).json({
        message: 'Bad request. Empty value!',
      });
    }

    const note = new Note({text, userId: user._id});

    await note.save();
    await res.json({
      message: 'Note has been created successfully',
      note,
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const getNote = async (req, res) => {
  try {

    const user = await req.user;
    const noteId = await req.params.id;
    const condition = Types.ObjectId.isValid(noteId);
    if (!condition) {
      return await res.status(400).json({
        message: `Invalid ID!`,
      });
    }

    const note = await Note.findOne({_id: noteId, userId: user._id});

    if (!note) {
      return await res.status(400).json({
        message: `Note with this id not found!`,
      });
    }

    await res.status(200).json({
      note,
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const user = await req.user;
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 0;
    const count = await Note.find({userId: user._id}).countDocuments();
    const notes = await Note.find({userId: user._id}, '-__v')
        .skip(offset)
        .limit(limit);

    if (!notes) {
      return await res.status(400).json({
        message: 'notes not found!',
      });
    }

    await res.status(200).json({
      offset,
      limit,
      count,
      notes,
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const changeCurrentNote = async (req, res) => {
  try {
    const user = await req.user;
    const noteId = await req.params.id;
    const note = await Note.findOne({_id: noteId, userId: user._id});
    const newTextValue = req.body.text;

    if (!newTextValue) {
      return await res.status(400).json({
        message: 'Bad request. Empty value!',
      });
    }

    note.text = newTextValue;
    await note.save();

    await res.status(200).json({
      message: 'Success',
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const changeNoteCompleted = async (req, res) => {
  try {
    const user = await req.user;
    const noteId = await req.params.id;
    const note = await Note.findOne({_id: noteId, userId: user._id});

    note.completed = !note.completed;

    await note.save();

    await res.status(200).json({
      message: 'Success',
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

const removeNote = async (req, res) => {
  try {
    const user = await req.user;
    const noteId = await req.params.id;
    const note = await Note.findOne({_id: noteId, userId: user._id});

    if (!note) {
      return await res.status(400).json({
        message: 'note not found. check your id!',
      });
    }

    await Note.findOneAndRemove({_id: noteId, userId: user._id});

    await res.status(200).json({
      message: 'This note has been removed successfully!',
    });
  } catch (e) {
    return await res.status(500).json({
      message: `${e.message}`,
    });
  }
};

module.exports = {
  createNote,
  getNote,
  getNotes,
  changeCurrentNote,
  changeNoteCompleted,
  removeNote,
};
