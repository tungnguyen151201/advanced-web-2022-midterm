import React, { useState } from 'react';

// we are using class component here bcoz functional components cant use react life cycle hooks such as componentDidUpdate
const BoxChat = () => {
  const { messagesList } = this.props;
  componentDidUpdate = (prevProps, prevState) => {
    // if component received new props
    if (this.props.messagesList !== prevProps.messagesList) {
      // call ref and scroll
      this.messageListEnd.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className='chat-window'>
      <div className='box'>
        <div className='inner'>
          {Array.isArray(messagesList) &&
            messagesList.map((oneMessage, index) => (
              <p key={index} className='message'>
                {oneMessage.text}
              </p>
            ))}
          {/* define ref and call it if component is updated */}
          <div
            className='reference'
            ref={(node) => (this.messageListEnd = node)}
          />
        </div>
      </div>
    </div>
  );
};
export default BoxChat;
