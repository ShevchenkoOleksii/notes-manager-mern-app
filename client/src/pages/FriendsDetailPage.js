import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useParams} from "react-router-dom";
import {Loader} from "../components/Loader";

const FriendsDetailPage = () => {
    const [friend, setFriend] = useState(null);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();
    const friendId = useParams().id;

    //???
    const updateNotes = useCallback(async () => {
        try {
            const fetched = await request(`/api/friends/update/${friendId}`, 'PATCH', null, {
                Authorization: `Bearer ${token}`,
            });
            message(fetched.message);
        } catch (e) {
            message(e.message);
        }
    }, [token, request]);

    const fetchedFriend = useCallback(async () => {
        try {
            const fetched = await request(`/api/friends/${friendId}`, 'GET', null, {
                Authorization: `Bearer ${token}`,
            });
            setFriend(fetched.friend);
        } catch (e) {
            message(e.message);
        }
    }, [token, request]);

    useEffect(() => {
        updateNotes();
        fetchedFriend();
    }, [fetchedFriend]);

    if (loading || !friend) {
        return <Loader/>
    }

    return (
        <div className="row">
            <h5>{friend.friendName}</h5>
            <table>

                <thead>
                <tr>
                    <th>№</th>
                    <th>Note</th>
                    <th>Created Date</th>
                    <th>Checked</th>
                </tr>
                </thead>

                <tbody>
                {friend.friendsNotes.map((note, index) => {
                    return (
                        <tr key={note._id}>
                            <td><strong>{index + 1}</strong></td>
                            <td>{note.text}</td>
                            <td>{`${new Date(note.createdDate).toLocaleTimeString()} `}
                            <strong>{`${new Date(note.createdDate).toLocaleDateString()}`}</strong>
                            </td>
                            <td>
                                {note.completed
                                    ? <i className="material-icons">check_box</i>
                                    : <i className="material-icons">check_box_outline_blank</i>
                                }
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <button onClick={updateNotes} className="btn light-blue">Update</button>
        </div>
    );
};

export default FriendsDetailPage;