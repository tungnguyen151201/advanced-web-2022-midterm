import React, { useState } from 'react';
import './BoxChat.css';
// we are using class component here bcoz functional components cant use react life cycle hooks such as componentDidUpdate
const Message = ({ user, message }) => {
  return (
    <div className='btn-Message'>
      <div className='user-name'>{user}</div>
      <div className='message'>{message}</div>
    </div>
  );
};
export default Message;
