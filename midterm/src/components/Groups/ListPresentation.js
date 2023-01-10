import '../Quiz/Quiz.css';
import '../MyPresentations/MyPresentations.css';
import PresentItem from '../MyPresentations/PresentItem';
import useGlobalState from '../../context/useAuthState';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';
import React from 'react';
import WarningLogin from '../WarningLogin/WarningLogin';
const ListPresentations = (props) => {
  const navigate = useNavigate();
  const [state] = useGlobalState();
  const [myPresentations, setMyPresentations] = useState([]);
  const { id } = useParams();
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
  const handleAddpresent = async (idPresent) => {
    const res = await axios.patch(
      `http://localhost:3001/presentation/edit/${idPresent}`,
      {
        groupId: id,
      },
      {
        headers: {
          Authorization: state.token,
        },
      }
    );
    const { status, message } = res.data;
    if (status) {
      navigate(`/getGroups/${id}`);
    }
  };
  return state.token ? (
    <div className='mypre__container'>
      <div className='mypre__list'>
        <div className='mypre__titles'>
          <p>Name</p>
          <p>Owner</p>
          <p>Created</p>
        </div>
        <hr className='mypre__line' />
        <div className='mypre__items'>
          {myPresentations.map((e, index) => {
            return (
              <PresentItem
                onClick={() => handleAddpresent(e._id)}
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
  ) : (
    <WarningLogin />
  );
};

export default ListPresentations;
