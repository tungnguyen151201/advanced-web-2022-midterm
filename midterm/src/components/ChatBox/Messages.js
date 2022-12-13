import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {SocketContext} from '../../context/socket';

const Message = () => {
  const socket = useContext(SocketContext);
  // if form was submitted, notify parent component
  let { id } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [MessageReceive, setMessageReceive] = useState({});
  // socket.emit('join-room', id);

  useEffect(() => {
    socket.on('chat-message', (data) => {
      console.log(data);
      // setMessageReceive(data.message);
    });
    socket.on('connect_error', (err) => {
      if (err.message === 'xhr poll error') return;
      console.log(`connect_error :${err.message}`);
    });
    socket.on('handle-error', (error) => {
      setError(error);
    });
  }, []);
  const handleSendMessage = () => {
    socket.emit('chat-message', message);
  };
  return error ? (
    <div className='chat-composer'>{error}</div>
  ) : (
    <div className='chat-composer'>
      {/* <div>{MessageReceive}</div> */}
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
