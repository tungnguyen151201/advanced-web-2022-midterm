import React, { useEffect, useState } from 'react';
import './Groups.css';

import { useParams, useNavigate } from 'react-router-dom';
import { BsFillArchiveFill, BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
const token = 'Bearer ' + localStorage.getItem('token');

const Groups = () => {
  const nagative = useNavigate();
  const [owner, setOwner] = useState('-');
  // the dynamic pieces of the URL.
  let { id } = useParams();

  const [members, setMembers] = useState({ listitems: [] });
  const [coowner, setCoowner] = useState({ listitems: [] });

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
  });
  const handleOnGetLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/join/${id}`);
  };
  const handleOnSendEmail = () => {
    nagative(`/sendInviteEmail/${id}`);
  };
  console.log(owner);
  return (
    <React.Fragment>
      <div className="group-container">
        <Button variant="primary" onClick={() => handleOnGetLink()}>
          Create Link
        </Button>
        <Button variant="primary" onClick={() => handleOnSendEmail()}>
          Send Invite Email
        </Button>
        <h1>Owners: {owner.username}</h1>
        <h1>Co-Owners</h1>
        <ul className="list-group">
          {coowner.listitems.map((listitem) => (
            <li className="list-group-item list-group-item-primary">
              {listitem.username}{' '}
              <span className="group-icons">
                <BsFillArchiveFill className="delete-icon" /> <BsFillPencilFill className="edit-icon" />
              </span>
            </li>
          ))}
        </ul>
        <h1>Members</h1>
        <ul className="list-group">
          {members.listitems.map((listitem) => (
            <li className="list-group-item list-group-item-primary">
              {listitem.username}{' '}
              <span className="group-icons">
                <BsFillArchiveFill className="delete-icon" /> <BsFillPencilFill className="edit-icon" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Groups;
