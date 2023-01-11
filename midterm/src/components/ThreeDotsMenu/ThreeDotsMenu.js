import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useGlobalState from '../../context/useAuthState';

const ThreeDotsMenu = ({ id, groupId }) => {
  const navigate = useNavigate();
  const [state] = useGlobalState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/quiz/${id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/presentation/delete/${id}`,
        {
          headers: {
            Authorization: state.token,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddAnother = async () => {
    navigate(`../group/listPresentations/${groupId}`);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
        {!groupId && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
        {groupId ? (
          <MenuItem onClick={handleAddAnother}>Add another presentation</MenuItem>
        ) : (
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default ThreeDotsMenu;
