import GroupInfo from './groups';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Mygroup() {
  const nagative = useNavigate();
  const [infoGroup, setInfo] = useState({
    id: null,
    groupname: null,
    members: null,
    coowner: null,
    owner: null,
  });
  const [listGroup, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/groups/mygroup');
        console.log(res);
        const { id, groupname, members, coowner, owner } = res.data.myGroups;
        setList(res.data.myGroups);
        setInfo({ id, groupname, members, coowner, owner });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleOnclick = async (e) => {
    try {
      nagative(`/getGroups/${infoGroup.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className='d-flex justify-content-center'>
      {listGroup.map((e, index) => {
        return (
          <GroupInfo
            key={index}
            name={e.groupname}
            members={e.members}
            coowner={e.coowner}
            onClick={handleOnclick}
          ></GroupInfo>
        );
      })}
    </Container>
  );
}

export default Mygroup;
