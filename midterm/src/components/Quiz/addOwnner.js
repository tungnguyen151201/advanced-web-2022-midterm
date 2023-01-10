import './Quiz.css';

import useGlobalState from '../../context/useAuthState';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from '@material-ui/core/Button';
import WarningLogin from '../WarningLogin/WarningLogin';
const AddOwnner = (idPresent) => {
  const [state] = useGlobalState();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const [coowners, setCoowners] = useState([{ username: '' }]);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const handleAddOwnner = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3001/presentation/edit/${idPresent}`,
        {
          coowners: coowners,
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
      setOpen(false);
      setShow(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleAddMutiCoownner = () => {
    setCoowners((arr) => [...arr, { username: '' }]);
  };
  const handleUsernameInput = (usernameInput, index) => {
    const newArray = coowners.map((item, i) => {
      if (index === i) {
        return { username: usernameInput };
      } else {
        return item;
      }
    });
    setCoowners(newArray);
  };
  return state.token ? (
    <div>
      <button
        className='quiz__btn quiz__btn--b m-r'
        onClick={handleClickToOpen}
      >
        Share
      </button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{'Enter username'}</DialogTitle>
        <DialogContent>
          {coowners.map((e, index) => {
            return (
              <input
                placeholder='e.g.user01'
                key={index}
                type='text'
                className='mypre__input m-u'
                onChange={(e) => handleUsernameInput(e.target.value, index)}
              />
            );
          })}

          <Button onClick={handleAddMutiCoownner} color='warning' autoFocus>
            New +
          </Button>
        </DialogContent>
        <DialogActions className='mypr__dialog'>
          <Button onClick={handleToClose} color='warning' autoFocus>
            Close
          </Button>
          <Button onClick={handleAddOwnner} color='primary' autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer className='chat__toast p-3' position='bottom-center'>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          bg='success'
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Notify</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>
            Add Coowners Successful!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  ) : (
    <WarningLogin />
  );
};

export default AddOwnner;
