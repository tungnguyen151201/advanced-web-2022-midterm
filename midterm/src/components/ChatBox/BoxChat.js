import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../context/socket';
import Messages from './Messages';
const BoxChat = () => {
  const socket = useContext(SocketContext);
  // if form was submitted, notify parent component
  let { id } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [MessageReceive, setMessageReceive] = useState([{}]);
  socket.emit('join-room', id);

  const handleSendMessage = () => {
    console.log(message);
    socket.emit('chat-message', message);
  };
  useEffect(() => {
    socket.on('chat-message', (data) => {
      setMessageReceive((MessageReceive) => MessageReceive.concat(data));
    });
    socket.on('connect_error', (err) => {
      if (err.message === 'xhr poll error') return;
      console.log(`connect_error :${err.message}`);
    });
    socket.on('handle-error', (error) => {
      setError(error);
    });
  }, []);

  return (
    <div className='chat-composer'>
      <div className='chat-canvas'>
        {MessageReceive.map((value, index) => {
          return (
            <Messages
              key={index}
              user={value.user}
              message={value.message}
            ></Messages>
          );
        })}
      </div>
      <div className='input-message'>
        <form className='w-100 m-2 input-message'>
          <input
            className='form-control'
            placeholder='Enter message...'
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </form>
        <button
          className='btn btn-primary m-2 sendmessage'
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
// we are using class componen coz we need temp state here
export default BoxChat;
