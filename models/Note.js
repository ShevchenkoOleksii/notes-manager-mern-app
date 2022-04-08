const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('Note', schema);
