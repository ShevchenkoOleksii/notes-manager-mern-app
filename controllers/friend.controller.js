const Friend = require('../models/Friend');
const Note = require('../models/Note');
const User = require('../models/User');

const getFriends = async (req, res) => {
    try {
        const user = await req.user;
        const friends = await Friend.find({userId: user._id});

        if (!friends) {
            return await res.status(400).json({
                message: 'friends not found!',
            });
        }

        await res.status(200).json({
            friends,
        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

const getFriend = async (req, res) => {
    try {
        const user = await req.user;
        const friendId = await req.params.id;
        const friend = await Friend.findById(friendId);

        if (!friend) {
            return await res.status(400).json({
                message: 'friends not found!',
            });
        }

        await res.status(200).json({
            friend,
        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

const addFriend = async (req, res) => {
    try {
        const user = await req.user;
        const candidate = await req.body.friend;

        const isFriendAdded = await Friend.find({friendName: candidate.username, userId: user._id});

        if (!!isFriendAdded.length) {
            return res.status(400).json({
                message: `${isFriendAdded[0].friendName} has been already added`
            })
        }

        const notes = await Note.find({userId: candidate._id});

        const friend = new Friend({
            friendName: candidate.username,
            friendsFrom: Date.now(),
            friendsNotes: notes,
            userId: user._id,
            originalId: candidate._id,
            createdDate: user.createdDate,
        });

        await friend.save();
        await res.json({
            message: `You have added ${candidate.username} to your friends successfully`,
            friend,
        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

const changeHandler = async (req, res, key) => {
    try {
        const friendId = await req.params.id;
        const friend = await Friend.findById(friendId);

        friend[key] = !friend[key];

        await friend.save();
        await res.status(200).json({
            message: 'Success!',
        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

const likeFriend = async (req, res) => {
    await changeHandler(req, res, 'like');
};

const changeFavorite = async (req, res) => {
    await changeHandler(req, res, 'favorite');
};

const removeFriend = async (req, res) => {
    try {
        const user = await req.user;
        const friendId = await req.params.id;
        const friend = await Friend.findOne({_id: friendId, userId: user._id});

        if (!friend) {
            return await res.status(400).json({
                message: 'Friend not found. check your id!',
            });
        }

        await Friend.findOneAndRemove({_id: friendId, userId: user._id});

        await res.status(200).json({
            message: `${friend.friendName} has been removed successfully!`,
        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

const updateNotes = async (req, res) => {
    try {
        const friendId = await req.params.id;
        const friend = await Friend.findById(friendId);

        friend.friendsNotes = await Note.find({userId: friend.originalId});

        await friend.save();
        await res.status(200).json({
            message: 'UPD. Success!',
        });
    } catch (e) {
        return await res.status(500).json({
            message: `${e.message}`,
        });
    }
};

module.exports = {
    addFriend,
    likeFriend,
    changeFavorite,
    removeFriend,
    updateNotes,
    getFriends,
    getFriend
}