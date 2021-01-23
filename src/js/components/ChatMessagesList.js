import React, { useCallback } from 'react';
import { useSelector } from 'react-redux'
import { timeFromNow } from '../utils/time'


function ChatMessagesList({ messages, innerRef }) {
  const { user } = useSelector(({ auth }) => auth)

  const isAuthor = useCallback((uid) => user.uid === uid ? 'right' : 'left', [user])
  return (
    <div className="chat-container">
          <ul ref={innerRef} className="chat-box chatContainerScroll">
            {messages.map(message =>  
            <li
              className={`chat-${isAuthor(message.author.uid)}`}
              key={message.id}
            >
              <div className="chat-avatar">
                <img
                  src={message.author.avatar}
                  alt="Retail Admin" />
                <div className="chat-name">{message.author.username}</div>
              </div>
              <div className="chat-text-wrapper">
                <span className="chat-text">{message.content}</span>
                <span className="chat-spacer"></span>
                <div className="chat-hour">{timeFromNow(parseInt(message.timestamp))}</div>
              </div>
            </li>)}
           
          </ul>
        </div>
  );
}

export default ChatMessagesList;