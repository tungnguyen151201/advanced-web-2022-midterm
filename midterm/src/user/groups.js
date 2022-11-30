import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useNavigate } from 'react-router-dom';
function GroupInfo({ idGroup, name, members, coowner }) {
  const nagative = useNavigate();
  const handleOnclick = async (e) => {
    try {
      //   console.log(2);
      nagative(`/getGroups/${idGroup}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className='mt-3 d-flex flex-row'>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{members.length + coowner.length} members</Card.Text>
      </Card.Body>
      <Button variant='primary' onClick={() => handleOnclick()}>
        See detail
      </Button>
    </Card>
  );
}
export default GroupInfo;
