const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    friendName: {
        type: String,
        require: true,
        unique: false,
    },
    userId: {
        type: Types.ObjectId,
        require: true,
    },
    originalId: {
        type: Types.ObjectId,
        require: true,
    },
    like: {
        type: Boolean,
        default: false,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    friendsNotes: {
        type: Array,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    friendsFrom: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model('Friend', schema);
