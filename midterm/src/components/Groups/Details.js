import React, { useEffect, useState } from 'react';
import './Groups.css';

import { useParams, useNavigate } from 'react-router-dom';
import { BsFillArchiveFill, BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';
const token = 'Bearer ' + localStorage.getItem('token');

const Groups = () => {
  const nagative = useNavigate();
  const [owner, setOwner] = useState('');

  let { id } = useParams();

  const [members, setMembers] = useState({ listitems: [] });
  const [coowner, setCoowner] = useState({ listitems: [] });

  const link = `http://localhost:3000/join/${id}`;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/groups/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOwner(res.data.owner);
        setMembers({ listitems: res.data.members });
        setCoowner({ listitems: res.data.coowner });
      });
  }, [owner, members, coowner, id]);
  const handleOnSendEmail = () => {
    nagative(`/sendInviteEmail/${id}`);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to the clipboard');
  };
  return (
    <React.Fragment>
      <div className="group-container">
        <h1>
          Owners: <span className="pr-t">{owner.username}</span>
        </h1>
        <h1>{coowner.username === null ? '' : coowner.username}</h1>
        <hr />
        <ul className="list-group">
          {coowner.listitems.map((listitem) => (
            <li className="list-group-item list-group-item-primary">
              {listitem.username}{' '}
              <span className="group-icons">
                <BsFillArchiveFill className="delete-icon" />{' '}
                <BsFillPencilFill className="edit-icon" />
              </span>
            </li>
          ))}
        </ul>
        <h1>Members</h1>
        <ul className="group__list list-group">
          {members.listitems.map((listitem) => (
            <li className="group__list-item list-group-item list-group-item-primary">
              <span className="group__item-name">{listitem.username}</span>
              <span className="group-icons">
                <BsFillArchiveFill className="delete-icon" />{' '}
                <BsFillPencilFill className="edit-icon" />
              </span>
            </li>
          ))}
        </ul>
        <button className="btn-group__copy" onClick={handleCopy}>
          Copy link
        </button>
        <button
          className="btn-group__email"
          onClick={() => handleOnSendEmail()}
        >
          Invite by email
        </button>
      </div>
    </React.Fragment>
  );
};

export default Groups;
