import '../Quiz/Quiz.css';
import './MyPresentations.css';
import PresentItem from './PresentItem';
import useGlobalState from '../../context/useAuthState';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyPresentations = (props) => {
  const navigate = useNavigate();
  const [state] = useGlobalState();
  const [myPresentations, setMyPresentations] = useState([]);

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
  return (
    <div className="mypre__container">
      <h1>My presentations</h1>
      <button className="quiz__btn quiz__btn--b m-r">+ New presentation</button>
      <div className="mypre__list">
        <div className="mypre__titles">
          <p>Name</p>
          <p>Owner</p>
          <p>Created</p>
        </div>
        <hr className="mypre__line" />
        <div className="mypre__items">
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
  );
};

export default MyPresentations;
