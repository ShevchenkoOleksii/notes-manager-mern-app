import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useNavigate, useParams} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

const FriendCard = ({friend, cb}) => {
    const navigate = useNavigate();
    // const [like, setLike] = useState(false);
    const [favorite, setFavorite] = useState(friend.favorite);
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    // const friendId = useParams().id;
    const [liked, setLiked] = useState(friend.like);
    const message = useMessage();
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const likeHandler = async (event) => {
        event.preventDefault();
        try {
            const fetched = await request(`/api/friends/like/${friend._id}`, 'PATCH', null, {
                Authorization: `Bearer ${token}`
            });
            setLiked(!liked);
            // navigate(`/api/notes`);
            message(fetched.message);
        } catch (e) {
            message(e.message);
        }
    };

    const favoriteHandler = async (event) => {
        event.preventDefault();
        try {
            const fetched = await request(`/api/friends/favorite/${friend._id}`, 'PATCH', null, {
                Authorization: `Bearer ${token}`
            });
            setFavorite(!favorite);
            // navigate(`/api/notes`);
            message(fetched.message);
        } catch (e) {
            message(e.message);
        }
    };

    const removeFriend = async (event) => {
        event.preventDefault();

        try {
            const fetched = await request(`/api/friends/delete/${friend._id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });
            cb();
            message(fetched.message);
        } catch (e) {
            message(e.message);
        }
    };

    const goToDetailPage = (event) => {
        event.preventDefault();
        navigate(`/api/friends/${friend._id}`);
    };

    const changeHandler = (event) => {
        setMessageText(event.target.value);
    };

    const sendMessage = async (event) => {
        event.preventDefault();

        try {
            const data = await request('/api/messages/send', 'POST',
                {
                    friend,
                    messageText: messageText,
                },
                {
                    Authorization: `Bearer ${token}`
                });
            message(data.message);
            setMessageText('');
            // navigate(`/api/notes/${data.note._id}`);
        } catch (e) {
            message(`${e.message}`);
        }
    };

    return (
        <div className="card col s6">
            <div className="card-content">
                <span className="card-title"><strong>{friend.friendName}</strong></span>
                {/*<p>{user.username}User №{index + 1}</p>*/}
                {/*<p><strong>Created Date:</strong> {`${new Date(friend.createdDate).toLocaleTimeString()} ${new Date(friend.createdDate).toLocaleDateString()}`}</p>*/}
                {/*<p><strong>Added to friends:</strong>{`${new Date(friend.friendsFrom).toLocaleTimeString()} ${new Date(friend.friendsFrom).toLocaleDateString()}`}</p>*/}
                <table>
                    <thead>
                    <tr>
                        <th>Created Date:</th>
                        <th>Added to friends:</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>{`${new Date(friend.createdDate).toLocaleTimeString()} ${new Date(friend.createdDate).toLocaleDateString()}`}</td>
                        <td>{`${new Date(friend.friendsFrom).toLocaleTimeString()} ${new Date(friend.friendsFrom).toLocaleDateString()}`}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-action">
                <a href="/" onClick={likeHandler}>
                    {!liked
                        ? <i className="material-icons" style={{color: "red"}}>favorite_border</i>
                        : <i className="material-icons" style={{color: "red"}}>favorite</i>
                    }
                </a>
                <a href="/" onClick={favoriteHandler}>
                    {!favorite
                        ? <i className="material-icons">star_border</i>
                        : <i className="material-icons">star</i>
                    }
                </a>
                <a href="/" onClick={goToDetailPage} title="Show Detail">
                    <i className="material-icons" style={{color: "blue"}}>exit_to_app</i>
                </a>
                <a href="/" onClick={removeFriend}>
                    <i className="material-icons" style={{color: "red"}}>clear</i>
                </a>
                <a href="/" onClick={event => event.preventDefault()}>
                    <i className="material-icons" style={{color: "yellow"}}>refresh</i>
                </a>
                <a href="/" onClick={event => event.preventDefault()}>
                    <i className="material-icons" style={{color: "brown"}}>save</i>
                </a>
                <a href="/" onClick={event => event.preventDefault()}>
                    <i className="material-icons" style={{color: "coral"}}>add</i>
                </a>
                <a href="/" onClick={sendMessage} title="Send">
                    <i className="material-icons" style={{color: "blue"}}>send</i>
                </a>
                <div className="input-field col s6">
                    <input id="message"
                           type="text"
                           className="validate"
                           value={messageText}
                           onChange={changeHandler}
                    />
                        <label htmlFor="message">Message</label>
                </div>
            </div>
        </div>
    );
};

export default FriendCard;