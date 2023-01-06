import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const ThreeDotsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const MyOptions = ['Present', 'Delete'];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="more" onClick={handleClick} aria-haspopup="true" aria-controls="long-menu">
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
        {MyOptions.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotsMenu;
