import React, { useState } from 'react';
import { createTimestamp } from '../utils/time'

const Messenger = ({ onSubmit }) => {

  const [value, setValue] = useState('')

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
      setValue('')
    }
  }

  const sendMessage = () => {
    const content = value.trim()

    if (!content) return

    const message = {
      content,
      timestamp: createTimestamp()
    }
    

    onSubmit(message)
  }

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea 
        onKeyPress={onKeyPress}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control"
        row="3"
        placeholder="Type your message here."
      >
        
      </textarea>
  </div>
  );
};

export default Messenger;