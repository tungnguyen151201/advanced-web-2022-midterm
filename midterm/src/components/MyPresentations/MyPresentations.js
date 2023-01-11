import '../Quiz/Quiz.css';
import './MyPresentations.css';
import PresentItem from './PresentItem';
import useGlobalState from '../../context/useAuthState';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import WarningLogin from '../WarningLogin/WarningLogin';
const MyPresentations = (props) => {
  const navigate = useNavigate();
  const [state] = useGlobalState();
  const [myPresentations, setMyPresentations] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nameInput, setNameInput] = useState();

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    try {
      setOpen(false);
      await axios.post(
        'http://localhost:3001/presentation/create',
        {
          name: nameInput,
          slides: [
            {
              question: 'Question 1',
              options: ['Option 1', 'Option 2', 'Option 3'],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/presentation', {
          headers: {
            Authorization: state.token,
          },
        });
        setMyPresentations(res.data.presentations);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [state.token, myPresentations]);
  return state.token ? (
    <div className='mypre__container'>
      <h1>My presentations</h1>
      <button
        className='quiz__btn quiz__btn--b m-r'
        onClick={handleClickToOpen}
      >
        + New presentation
      </button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{'Enter name of presentation'}</DialogTitle>
        <DialogContent>
          <input
            placeholder='e.g.Group01'
            type='text'
            className='mypre__input m-u'
            onChange={(e) => setNameInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='mypr__dialog'>
          <Button onClick={handleToClose} color='warning' autoFocus>
            Close
          </Button>
          <Button onClick={handleCreate} color='primary' autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <div className='mypre__list'>
        <div className='mypre__titles'>
          <p>Name</p>
          <p>Owner</p>
          <p>Created</p>
        </div>
        <hr className='mypre__line' />
        <div className='mypre__items'>
          {myPresentations.map((e, index) => {
            return (
              <PresentItem
                onClick={() => navigate(`../demo/${e._id}`)}
                id={e._id}
                name={e.name}
                owner={`${e.owner.firstName} ${e.owner.lastName}`}
                createdAt={e.createdAt}
              ></PresentItem>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <WarningLogin />
  );
};

export default MyPresentations;
