import GroupInfo from './groups';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import './MyGroups.css';
import useGlobalState from '../context/useAuthState';

function Mygroup() {
  const [state, dispatch] = useGlobalState();
  const nagative = useNavigate();
  const [listGroup, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/groups/mygroup', {
          headers: {
            Authorization: state.token,
          },
        });

        setList(res.data.myGroups);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [state.token]);
  const handleOnclick = async (e) => {
    try {
      nagative(`/createGroup`);
    } catch (error) {
      console.log(error);
    }
  };
  return state.token ? (
    <Container className="p-10">
      <Button
        className="group__btn"
        variant="primary"
        onClick={() => handleOnclick()}
      >
        <BsPlusLg />
        Create group
      </Button>

      {listGroup.map((e, index) => {
        return (
          <GroupInfo
            key={index}
            idGroup={e._id}
            name={e.groupname}
            members={e.members}
            coowner={e.coowner}
          ></GroupInfo>
        );
      })}
    </Container>
  ) : (
    'Chưa login'
  );
}

export default Mygroup;
