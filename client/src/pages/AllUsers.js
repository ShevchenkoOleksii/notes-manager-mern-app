import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import UserCard from "../components/UserCard";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();
    const fetchedUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/users/me/all', 'GET', null, {
                Authorization: `Bearer ${token}`,
            });
            setUsers(fetched.allUsers);
        } catch (e) {
            message(e.message, 'message_error');
        }
    }, [token, request]);

    useEffect(() => {
        fetchedUsers();
    }, [fetchedUsers]);

    return (
        // <div className="row">
        //     <div className="col s6">
        //         <div className="collection">
        //             {users.map((user, index) => {
        //                 return (<a href="/" className="collection-item">{user.username}</a>)
        //             })
        //             }
        //         </div>
        //     </div>
        // </div>

        <div className="row">
            <div className="col">
                {users.map((user, index) => {
                    return (
                        <UserCard key={user._id} user={user}/>
                    )
                })}
            </div>
        </div>
    );
};

export default AllUsers;