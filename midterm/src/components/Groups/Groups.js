import React, { Component } from 'react';
import './Groups.css';
import { BsFillArchiveFill, BsFillPencilFill } from 'react-icons/bs';

class Groups extends Component {
  state = {
    listitems: ['Item 1', 'Item 2', 'Item 3'],
  };

  render() {
    return (
      <React.Fragment>
        <div className="group-container">
          <h1>Create group</h1>
          <input type="email" placeholder="Enter your friend's email"></input>
          <ul className="list-group">
            {this.state.listitems.map((listitem) => (
              <li className="list-group-item list-group-item-primary">
                {listitem}{' '}
                <span className="group-icons">
                  <BsFillArchiveFill className="delete-icon" /> <BsFillPencilFill className="edit-icon" />
                </span>
              </li>
            ))}
          </ul>
          <button className="btn-create">Done</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Groups;
