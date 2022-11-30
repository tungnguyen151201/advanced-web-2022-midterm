import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function GroupInfo({ name, members, coowner, handleOnClick }) {
  return (
    <Card className='mt-3'>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{members.lenght}</Card.Text>
        <Button variant='primary' onClick={handleOnClick}>
          See detail
        </Button>
      </Card.Body>
    </Card>
  );
}
export default GroupInfo;
