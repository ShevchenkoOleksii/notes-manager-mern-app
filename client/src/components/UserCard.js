import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";

const UserCard = ({user}) => {
    const [like, setLike] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();

    const likeHandler = (event) => {
        event.preventDefault();
        setLike(!like);
    };

    const favoriteHandler = (event) => {
        event.preventDefault();
        setFavorite(!favorite);
    };

    const addFriend = async (event) => {
        event.preventDefault();

        try {
            const data = await request('/api/friends/add', 'POST',
                {
                    friend: user,
                },
                {
                    Authorization: `Bearer ${token}`
                });
            message(data.message);
            // navigate(`/api/notes/${data.note._id}`);

        } catch (e) {
            message(e.message, 'message_error');
        }
    };

    const updateFriendsNotes = async (req, res) => {
        try {
            const fetched = await request(`/api/friends/update/${user._id}`, 'PUT', {friend: user}, {
                Authorization: `Bearer ${token}`,
            });
            message(fetched.message);
        } catch (e) {
            message(e.message);
        }
    };

    return (
        <div className="card col s4">
            <div className="card-content">

                {/*<button className="btn orange" onClick={updateFriendsNotes}>Update Friend</button>*/}

                <span className="card-title"><strong>{user.username}</strong></span>
                {/*<p>{user.username}User №{index + 1}</p>*/}
                <p>{`${new Date(user.createdDate).toLocaleTimeString()} ${new Date(user.createdDate).toLocaleDateString()}`}</p>
            </div>

            <div className="card-action">
                <button className="btn blue waves-effect waves-purple"
                        onClick={addFriend}>
                    Add Friend
                </button>
            {/*    <a href="/" onClick={likeHandler}>*/}
            {/*        {!like*/}
            {/*            ? <i className="material-icons" style={{color: "red"}}>favorite_border</i>*/}
            {/*            : <i className="material-icons" style={{color: "red"}}>favorite</i>*/}
            {/*        }*/}
            {/*    </a>*/}
            {/*    <a href="/" onClick={favoriteHandler}>*/}
            {/*        {!favorite*/}
            {/*            ? <i className="material-icons">star_border</i>*/}
            {/*            : <i className="material-icons">star</i>*/}
            {/*        }*/}
            {/*    </a>*/}
            {/*    <a href="/" onClick={event => event.preventDefault()}>*/}
            {/*        <i className="material-icons" style={{color: "blue"}}>send</i>*/}
            {/*    </a>*/}
            </div>
        </div>
    );
};

export default UserCard;