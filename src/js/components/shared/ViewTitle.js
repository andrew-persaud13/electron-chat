import React from 'react';
function ViewTitle({ children, text }) {
    return (
      <div className="chat-name-container">
        <span className="name">{ text }</span>
        <div>
        {children}
        </div>
      </div>
    );
}

export default ViewTitle;