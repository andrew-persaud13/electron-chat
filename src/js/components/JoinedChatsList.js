import React from 'react';
import {useHistory  } from 'react-router-dom'
import Search from './Search'
function JoinedChatsList({chats}) {
    const history = useHistory()
    return (
        <div className="list-container">
            <Search />
            <ul className="items">
                {
                   chats.map(chat =>
                    <li
                        onClick={() => history.push(`/chat/${chat.id}`)}
                        key={chat.id}
                        className="item"
                    >
                        <div className="item-status">
                            <img src={chat.image} />
                            <span className="status online"></span>
                        </div>
                        <p className="name-time">
                   <span className="name mr-2">{chat.name}</span>
                        </p>
                    </li>) 
                }
            </ul>
      </div>
    );
}

export default JoinedChatsList;