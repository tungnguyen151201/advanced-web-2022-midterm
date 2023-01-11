import './Quiz.css';
import '../Groups/Groups.css';
import useGlobalState from '../../context/useAuthState';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { BsFillArchiveFill } from 'react-icons/bs';
import DialogContent from '@material-ui/core/DialogContent';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from '@material-ui/core/Button';
import WarningLogin from '../WarningLogin/WarningLogin';
const CRUDCoowner = ({ idPresent }) => {
  const [state] = useGlobalState();
  const [open, setOpen] = React.useState(false);
  const [coowners, setCoowners] = useState([]);
  const [show, setShow] = useState(false);
  const handleClickToOpen = async () => {
    setOpen(true);
    axios
      .get(`http://localhost:3001/presentation/${idPresent}`, {
        headers: {
          Authorization: state.token,
        },
      })
      .then((res) => {
        console.log(res);
        setCoowners(res.data.presentation.coowners);
      });
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const kickAMember = (index) => {
    let newArray = [...coowners];
    newArray.splice(index, 1);
    setCoowners(newArray);
  };
  const handleSave = async () => {
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
      const { status } = res.data;
      if (status) {
        setOpen(false);
        setShow(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return state.token ? (
    <div>
      <button
        className='quiz__btn quiz__btn--b m-r'
        onClick={handleClickToOpen}
      >
        ListCoowner
      </button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{'List Coownners'}</DialogTitle>
        <DialogContent>
          {coowners.map((e, index) => {
            return (
              <li
                className='list-group-item list-group-item-primary'
                key={index}
              >
                {e}{' '}
                <span className='group-icons'>
                  <BsFillArchiveFill
                    className='delete-icon'
                    onClick={() => kickAMember(index)}
                  />{' '}
                </span>
              </li>
            );
          })}
        </DialogContent>
        <DialogActions className='mypr__dialog'>
          <Button onClick={handleToClose} color='warning' autoFocus>
            Close
          </Button>
          <Button onClick={handleSave} color='primary' autoFocus>
            Save
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
          <Toast.Body className='text-white'>update Successful!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  ) : (
    <WarningLogin />
  );
};

export default CRUDCoowner;
