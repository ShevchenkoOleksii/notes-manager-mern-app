const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  notes: [{
    type: Types.ObjectId,
    ref: 'Note',
  }],
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('User', schema);
