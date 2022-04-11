const Message = require('../models/Message');

const sendMessage = async (req, res) => {
    try {
        const messageText = req.body.messageText;
        // const toUserId = await req.body.id;
        const user = await req.user;
        const toUser = await req.body.friend;


        if (!messageText.trim()) {
            return res.status(400).json({
                message: `Empty Message! Text something!`
            })
        }

        const message = new Message({
            fromUserName: user.username,
            toUserName: toUser.friendName,
            messageText: messageText,
            fromUserId: user._id,
            toUserId: toUser.originalId,
            like: false,
            important: false,
            createdDate: Date.now(),
        });

        await message.save();
        await res.json({
            // message: `Message has been sent successfully`,
            data: message,
            message: `You have sent a message to ${toUser.friendName} successfully`,

        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const user = await req.user;
        const gettingMessages = await Message.find({toUserId: user._id});
        const sendingMessages = await Message.find({fromUserId: user._id});

        if (!gettingMessages.length && !sendingMessages.length) {
            return await res.status(400).json({
                message: 'Messages not found!',
            });
        }

        await res.status(200).json({
            user,
            messages: [
                ...gettingMessages,
                ...sendingMessages,
            ],
        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

module.exports = {
    sendMessage,
    getMessages
};