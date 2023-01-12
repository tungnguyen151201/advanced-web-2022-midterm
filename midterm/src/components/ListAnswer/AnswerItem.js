import './AnswerItem.css';
import { FaUserAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AnswerItem({ answer }) {
  const [user, setUser] = useState();
  useEffect(() => {
    console.log(answer);
    axios.get(`http://localhost:3001/user/${answer._id}`).then((res) => {
      console.log(res.data);
      if (res.data.status) {
        setUser(res.data.user);
      }
    })
  });

  return (
    <div className="answerItem__container">
      <p className="answerItem__user">
        <FaUserAlt />{user?.username ? user.username: answer._id}
      </p>
      <div className="answerItem__answer">{parseInt(answer.answer) + 1}</div>
    </div>
  );
}
