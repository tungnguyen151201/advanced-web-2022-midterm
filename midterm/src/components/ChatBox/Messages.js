import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
const socket = io.connect('http://locahost:3001', {
  auth: {
    token: localStorage.getItem('token'),
  },
  path: 'http://localhost:3000',
  transports: ['websocket'],
});
const Message = () => {
  // if form was submitted, notify parent component
  let { id } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [MessageReceive, setMessageReceive] = useState(['']);
  const handleSendMessage = () => {
    console.log(123);

    // socket.emit('chat-message', { message });
  };
  useEffect(() => {
    // console.log(io);
    socket.on('error', (error) => {
      console.log(`error:${error}`);
    });
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on('handle-error', (error) => {
      console.log(error);
      setError(error);
    });
    // socket.emit('join-room', id);
    // socket.on('chat-message', (data) => {
    //   console.log(data);
    //   setMessageReceive(data.message);
    // });
  }, []);

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
