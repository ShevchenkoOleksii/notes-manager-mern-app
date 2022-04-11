import React, {useCallback, useContext, useEffect, useState} from 'react';
import UserCard from "../components/UserCard";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();
    const fetchedFriends = useCallback(async () => {
        try {
            const fetched = await request('/api/friends', 'GET', null, {
                Authorization: `Bearer ${token}`,
            });
            setFriends(fetched.friends);
        } catch (e) {
            message(e.message, 'message_error');
        }
    }, [token, request]);

    useEffect(() => {
        fetchedFriends();
    }, [fetchedFriends]);



    return (
        <div className="row">
            <div className="col s12">
                {/*<button onClick={showFriends} className="btn green">friends</button>*/}
                {friends.map((friend, index) => {
                    return (
                        <FriendCard key={friend._id} friend={friend} cb={fetchedFriends}/>
                    )
                })}
            </div>
        </div>
    );
};

export default FriendsPage;