import './Groups.css';
import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import { BsFillArchiveFill, BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';
import useGlobalState from '../../context/useAuthState';
import PresentItem from '../MyPresentations/PresentItem';

const Groups = () => {
  const [state] = useGlobalState();
  const navigate = useNavigate();
  const [owner, setOwner] = useState('');

  let { id } = useParams();

  const [members, setMembers] = useState({ listitems: [] });
  const [coowner, setCoowner] = useState({ listitems: [] });
  const [presentation, setPresentation] = useState();

  const link = `http://localhost:3000/join/${id}`;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/groups/${id}`, {
        headers: {
          Authorization: state.token,
        },
      })
      .then((res) => {
        setOwner(res.data.owner);
        setMembers({ listitems: res.data.members });
        setCoowner({ listitems: res.data.coowner });
        setPresentation(res.data.presentation);
        // console.log(res.data.presentation);
      });
  }, [id, state.token, members, coowner]);

  const handleOnSendEmail = () => {
    navigate(`/sendInviteEmail/${id}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to the clipboard');
  };

  const handleOnAddPresent = () => {
    navigate(`/group/listPresentations/${id}`);
  };

  const promoteToCoowner = async (userId) => {
    const res = await axios.post(
      `http://localhost:3001/groups/promoteToCoowner/${id}`,
      {
        userId,
      },
      {
        headers: {
          Authorization: state.token,
        },
      }
    );
    console.log(res);
  };

  const demoteToMember = async (userId) => {
    await axios.post(
      `http://localhost:3001/groups/demoteToMember/${id}`,
      {
        userId,
      },
      {
        headers: {
          Authorization: state.token,
        },
      }
    );
  };

  const kickAMember = async (userId) => {
    await axios.post(
      `http://localhost:3001/groups/kickAMember/${id}`,
      {
        userId,
      },
      {
        headers: {
          Authorization: state.token,
        },
      }
    );
  };

  return (
    <React.Fragment>
      <div className="group-container">
        <h1>
          Owner: <span className="pr-t">{owner.username}</span>
        </h1>
        <hr />
        {/* Check co-owner ko hoat dong */}
        <h1>{coowner.listitems.length === 0 ? '' : `Co-owners`}</h1>
        <ul className="list-group">
          {coowner.listitems.map((listitem) => (
            <li className="list-group-item list-group-item-primary coowner__item">
              <p>{listitem.username} </p>
              {state.userId === owner._id ? (
                <span className="group-icons">
                  <Tooltip title="Demote to member">
                    <IconButton className="detail__icon-container" onClick={() => demoteToMember(listitem._id)}>
                      <EditIcon className="edit-icon" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Kick member">
                    <IconButton className="detail__icon-container" onClick={() => kickAMember(listitem._id)}>
                      <DeleteIcon className="delete-icon" />
                    </IconButton>
                  </Tooltip>
                </span>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
        <h1>Members</h1>
        <ul className="group__list list-group">
          {members.listitems.map((listitem) => (
            <li className="group__list-item list-group-item list-group-item-primary member__item">
              <span className="group__item-name">{listitem.username}</span>
              {state.userId === owner._id ? (
                <span className="group-icons">
                  <Tooltip title="Promote to Co-owner">
                    <IconButton className="detail__icon-container" onClick={() => promoteToCoowner(listitem._id)}>
                      <EditIcon className="edit-icon" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Kick member">
                    <IconButton className="detail__icon-container" onClick={() => kickAMember(listitem._id)}>
                      <DeleteIcon className="delete-icon" />
                    </IconButton>
                  </Tooltip>
                </span>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
        <button className="btn-group__copy" onClick={handleCopy}>
          Copy link
        </button>
        <button className="btn-group__email" onClick={() => handleOnSendEmail()}>
          Invite by email
        </button>
        <div>
          {presentation ? (
            <>
              <hr className="detail__line" />
              <h1 className="detail__presentation">Presentations</h1>
              <PresentItem
                onClick={async () => {
                  await axios.patch(
                    `http://localhost:3001/presentation/edit/${presentation._id}`,
                    {
                      status: true,
                    },
                    {
                      headers: {
                        Authorization: state.token,
                      },
                    }
                  );
                  navigate(`../demo/${presentation._id}/group/${id}`);
                }}
                id={presentation._id}
                name={presentation.name}
                status={presentation.status}
                createdAt={presentation.createdAt}
                groupId={id}
              ></PresentItem>
            </>
          ) : (
            <button className="btn-group__email" onClick={() => handleOnAddPresent()}>
              Add presentation +
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Groups;
