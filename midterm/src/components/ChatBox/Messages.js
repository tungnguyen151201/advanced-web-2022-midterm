import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
const socket = io('http://localhost:3001', {
  auth: {
    token: localStorage.getItem('token'),
  },
  cors: {
    origin: 'http://localhost:3000',
  },
  transports: ['websocket'],
  // rejectUnauthorized: false,
});
const Message = () => {
  // if form was submitted, notify parent component
  let { id } = useParams();
  // console.log(socket.on('connect'));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [MessageReceive, setMessageReceive] = useState(['']);

  useEffect(() => {
    // console.log(id);
    socket.emit('join-room', id);
    socket.on('join-room', (mess) => {
      console.log(mess);
    });

    socket.on('chat-message', (data) => {
      console.log(data);
      setMessageReceive(data.message);
    });
    socket.on('connect_error', (err) => {
      if (err.message === 'xhr poll error') return;
      console.log(`connect_error :${err.message}`);
    });
    socket.on('handle-error', (error) => {
      console.log(error);
      setError(error);
    });
  }, []);
  const handleSendMessage = () => {
    socket.emit('chat-message', { message });
  };
  return error ? (
    <div className='chat-composer'>error</div>
  ) : (
    <div className='chat-composer'>
      <div>{MessageReceive}</div>
      <form onSubmit={handleSendMessage}>
        <input
          className='form-control'
          placeholder='Enter message...'
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
// we are using class componen coz we need temp state here
export default Message;
