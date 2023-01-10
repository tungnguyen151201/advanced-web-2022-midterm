import './Quiz.css';

import useGlobalState from '../../context/useAuthState';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import WarningLogin from '../WarningLogin/WarningLogin';
const AddOwnner = () => {
  const [state] = useGlobalState();
  const [open, setOpen] = React.useState(false);
  const [nameInput, setNameInput] = useState();

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const handleAddOwnner = async () => {
    try {
      setOpen(false);
      await axios.post(
        'http://localhost:3001/presentation/create',
        {
          name: nameInput,
          slides: [
            {
              question: '',
              options: [''],
            },
          ],
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
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
        Share
      </button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{'Enter username'}</DialogTitle>
        <DialogContent>
          <input
            placeholder='e.g.user01'
            type='text'
            className='mypre__input m-u'
            onChange={(e) => setNameInput(e.target.value)}
          />
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
    </div>
  ) : (
    <WarningLogin />
  );
};

export default AddOwnner;
