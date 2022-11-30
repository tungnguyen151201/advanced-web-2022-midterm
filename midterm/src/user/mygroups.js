import GroupInfo from './groups';
import Container from 'react-bootstrap/Container';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// import ModalcreateGroup from '../components/Group/CreateGroup';
function Mygroup() {
  //   const nagative = useNavigate();
  const nagative = useNavigate();
  //   const [modalShow, setModalShow] = useState(false);
  const [listGroup, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'Bearer ' + localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/groups/mygroup', {
          headers: {
            Authorization: token,
          },
        });

        setList(res.data.myGroups);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  const handleOnclick = async (e) => {
    try {
      //   console.log(2);
      nagative(`/createGroup`);

      //   DetailGroup(idGroup);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Button variant='primary' onClick={() => handleOnclick()}>
        Create Group
      </Button>
      {/* <Button variant='primary' onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <ModalcreateGroup show={modalShow} onHide={() => setModalShow(false)} /> */}

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
  );
}

export default Mygroup;
