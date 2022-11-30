import React, { useEffect, useState } from 'react';
import './Groups.css';
import { BsFillArchiveFill, BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';

const token = 'Bearer ' + localStorage.getItem('token');

const Groups = () => {
  const [owner, setOwner] = useState('-');
  const [members, setMembers] = useState({ listitems: [] });
  const [coowner, setCoowner] = useState({ listitems: [] });

  useEffect(() => {
    axios
      .get('http://localhost:3001/groups/6386fad20a693f472ca1d96d', {
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
  console.log(owner);
  return (
    <React.Fragment>
      <div className="group-container">
        <h1>Owners: {owner.username}</h1>
        <h1>Co-Owners</h1>
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
        <ul className="list-group">
          {members.listitems.map((listitem) => (
            <li className="list-group-item list-group-item-primary">
              {listitem.username}{' '}
              <span className="group-icons">
                <BsFillArchiveFill className="delete-icon" />{' '}
                <BsFillPencilFill className="edit-icon" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Groups;
