import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import DetailGroup from '../components/Groups/Details';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import './MyGroups.css';

function GroupInfo({ idGroup, name, members, coowner }) {
  const nagative = useNavigate();

  const handleOnclick = async (e) => {
    try {
      nagative(`/getGroups/${idGroup}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="mt-3 d-flex flex-row">
      <Card.Body className="group__card">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="group__member">
          <BsPeopleFill />
          {members.length + coowner.length + 1} {members.length + coowner.length + 1 > 1 ? 'members' : 'member'}
        </Card.Text>
      </Card.Body>
      <Button className="group__btn bd-l" variant="primary" onClick={() => handleOnclick()}>
        See detail
      </Button>
    </Card>
  );
}
export default GroupInfo;
