import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();
    const [user, setUser] = useState({});
    const cardClasses = {
        gettingMessages: 'col s7 left-align',
        sendingMessages: 'col s7 offset-s4 right-align',
    };
    const messageStyles = {
        gettingMessages: {color: 'green'},
        sendingMessages: {color: 'orange'},
    }

    const fetchedMessages = useCallback(async () => {
        try {
            const fetched = await request('/api/messages', 'GET', null, {
                Authorization: `Bearer ${token}`,
            });
            // setMessages(fetched.messages);
            setUser(fetched.user);
            setMessages(sortMessages(fetched.messages));
        } catch (e) {
            message(e.message);
        }
    }, [token, request]);

    const sortMessages = (arr) => {
        return arr.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    };

    const showSortedArr = () => {
        const arr = sortMessages(messages);
        console.log(arr);
        // const time = new Date(arr[0].createdDate).getTime();
        // console.log(time)
    }

    useEffect(() => {
        fetchedMessages();
    }, [fetchedMessages]);
    return (
        <div className="row">
                {messages.map((message, index) => {
                    return (
                        <div className={user.username === message.toUserName ? cardClasses.gettingMessages : cardClasses.sendingMessages} key={message._id}>

                            <div className="card">
                                {/*<div className="card-image">*/}
                                {/*    */}
                                {/*</div>*/}
                                <div className="card-stacked">
                                    <div className="card-content">
                                        {user.username === message.toUserName
                                            ? <h5 style={messageStyles.gettingMessages}>{message.fromUserName}</h5>
                                            : <h5 style={messageStyles.sendingMessages}>Me</h5>
                                        }
                                        <p style={{fontSize: '20px'}}>{message.messageText}</p>
                                        <p style={{fontSize: '14px'}}>{new Date(message.createdDate).toLocaleTimeString()}</p>
                                    </div>
                                    {/*<div className="card-action">*/}
                                    {/*    <a href="/">This is a link</a>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    );
};

export default MessagesPage;