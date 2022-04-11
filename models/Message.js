const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    fromUserName: {
        type: String,
        require: true,
    },
    toUserName: {
        type: String,
        require: true,
    },
    messageText: {
        type: String,
        require: true,
    },
    fromUserId: {
        type: Types.ObjectId,
        require: true,
    },
    toUserId: {
        type: Types.ObjectId,
        require: true,
    },
    like: {
        type: Boolean,
        default: false,
    },
    important: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model('Message', schema);
