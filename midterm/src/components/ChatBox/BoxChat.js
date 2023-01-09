import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../context/socket';
import Messages from './Messages';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
const BoxChat = () => {
  const socket = useContext(SocketContext);
  const limit = 2;
  const [notify, setNotify] = useState();
  // if form was submitted, notify parent component
  let { id } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [cursor, setCursor] = useState(0);
  const [oldMessages, setOldMessages] = useState([{}]);
  const [loadMessage, setLoadMessages] = useState([]);
  const [MessageReceive, setMessageReceive] = useState([{}]);
  socket.emit('join-room', id);
  const token = 'Bearer ' + localStorage.getItem('token');
  const handleSendMessage = () => {
    console.log(socket);
    socket.emit('chat-message', message);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation/loadMessage/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOldMessages(res.data.messages);
        // if (limit <= oldMessages.length) {
        //   const fisrtLoad = oldMessages.filter(
        //     (e, i) => i >= cursor && i < cursor + limit
        //   );
        //   setLoadMessages(fisrtLoad);
        //   setCursor(cursor + limit);
        // }
      });

    socket.on('chat-message', (data) => {
      setNotify(1);
      setMessageReceive((MessageReceive) => MessageReceive.concat(data));
    });
    socket.on('connect_error', (err) => {
      if (err.message === 'xhr poll error') return;
      console.log(`connect_error :${err.message}`);
    });
    socket.on('handle-error', (error) => {
      setError(error);
    });

    return () => {
      socket.off('chat-message');
      socket.off('connect_error');
      socket.off('handle-error');
    };
  }, [cursor, oldMessages, socket]);
  const handleScroll = (e) => {
    // const arr = [...oldMessages];

    let element = e.currentTarget.scrollTop;
    if (element === 0) {
      setCursor(cursor + limit);
      if (cursor >= oldMessages.length) {
        setCursor(cursor - limit);
        return;
      }
      const result = oldMessages.filter(
        (e, i) => i >= cursor && i < cursor + limit
      );
      setLoadMessages((arr) => [...arr, ...result]);
      console.log(loadMessage);
    }
  };

  return (
    <div className='chat-composer'>
      <ToastContainer className='p-3' position='top-end'>
        <Toast show={notify === 1} bg='dark' delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Message Box</strong>
            <small>1s ago</small>
          </Toast.Header>
          <Toast.Body className='text-white'>Have new message!</Toast.Body>
        </Toast>
      </ToastContainer>
      <div
        style={{
          border: '3px solid black',
          width: '400px',
          height: '100px',
          overflow: 'scroll',
        }}
        className='chat-canvas'
        onScroll={handleScroll}
      >
        {loadMessage.map((value, index) => {
          return (
            <Messages
              key={index}
              user={value.user}
              message={value.message}
            ></Messages>
          );
        })}
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
