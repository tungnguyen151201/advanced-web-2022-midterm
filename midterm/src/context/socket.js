import socketio from 'socket.io-client';
import React from 'react';

export const socket = socketio.connect('http://localhost:3001', {
  auth: {
    token: localStorage.getItem('token'),
  },
});
export const SocketContext = React.createContext();
