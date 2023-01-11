import './Quiz.css';

import useGlobalState from '../../context/useAuthState';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { BsShare } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from '@material-ui/core/Button';
import WarningLogin from '../WarningLogin/WarningLogin';
const InviteCoownner = ({ idPresent }) => {
  const [state] = useGlobalState();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState();

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const handleAddCoownner = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/presentation/addCoowner/${idPresent}`,
        {
          username,
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
      const { status } = res.data;
      if (status) {
        setOpen(false);
        setShow(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return state.token ? (
    <div>
      <button className="inviteCoonwer__btn quiz__btn quiz__btn--b m-r" onClick={handleClickToOpen}>
        <AiOutlineUserAdd /> Add Co-owner
      </button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{'Enter name of Co-owner'}</DialogTitle>
        <DialogContent>
          <input placeholder="e.g.user01" type="text" className="mypre__input m-u" onChange={(e) => setUsername(e.target.value)} />
        </DialogContent>
        <DialogActions className="mypr__dialog">
          <Button onClick={handleToClose} color="warning" autoFocus>
            Close
          </Button>
          <Button onClick={handleAddCoownner} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer className="chat__toast p-3" position="bottom-center">
        <Toast onClose={() => setShow(false)} show={show} bg="success" delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Notify</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Add Coowners Successful!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  ) : (
    <WarningLogin />
  );
};

export default InviteCoownner;
