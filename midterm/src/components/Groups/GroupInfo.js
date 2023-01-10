import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import DetailGroup from '../components/Groups/Details';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill, BsFillExclamationTriangleFill } from 'react-icons/bs';
import './MyGroups.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import useGlobalState from '../../context/useAuthState';

function GroupInfo({ idGroup, name, members, coowner }) {
  const nagative = useNavigate();
  const [state] = useGlobalState();

  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const handleOnclick = async (e) => {
    try {
      nagative(`/getGroups/${idGroup}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setOpen(false);
    await axios.delete(`http://localhost:3001/groups/delete/${idGroup}`, {
      headers: {
        Authorization: state.token,
      },
    });
  };
  return (
    <Card className="mt-3 d-flex flex-row">
      <Card.Body className="group__card">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="group__member">
          <BsPeopleFill />
          {members.length + coowner.length + 1}{' '}
          {members.length + coowner.length + 1 > 1 ? 'members' : 'member'}
        </Card.Text>
      </Card.Body>
      <Button
        className="group__btn bd-l"
        variant="primary"
        onClick={() => handleOnclick()}
      >
        See detail
      </Button>
      <Button
        className="group__btn bd-l b-5"
        variant="danger"
        onClick={handleClickToOpen}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle className="red fs-20">{'Warning'}</DialogTitle>
        <DialogContent>
          <DialogContentText className="flex-center fs-18">
            <BsFillExclamationTriangleFill className="danger__icon" /> Are you
            sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="groups__dialog">
          <Button onClick={handleDelete} color="warning" autoFocus>
            Delete
          </Button>
          <Button
            onClick={handleToClose}
            color="primary"
            className="rs-btn"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
export default GroupInfo;
