import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
// import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import InputInfo from './formInput';
import { useState, useEffect } from 'react';
import HeaderHomePage from '../components/Header/HeaderHomepage';
// import { useForm } from 'react-hook-form';
import Collapse from 'react-bootstrap/Collapse';

import axios from 'axios';
const token = 'Bearer ' + localStorage.getItem('token');

function Profile() {
  const [infoUser, setInfo] = useState({
    username: null,
    firstName: '',
    lastName: '',
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/profile', {
          headers: {
            Authorization: token,
          },
        });
        const { username, firstName, lastName } = res.data.myProfile;
        setInfo({ username, firstName, lastName });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  const handleInput = (e) => {
    setInfo({ ...infoUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Data for update : ', infoUser);
      await axios.post(`http://localhost:3001/profile/edit/`, infoUser, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <HeaderHomePage></HeaderHomePage>
      <Container className='d-flex justify-content-center'>
        <div>
          <h3 className='text-center'>Profile</h3>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <div className='text-center'>
                <Card.Img
                  variant='top'
                  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                  style={{ width: '70px', height: '70px', border: '50%' }}
                />
                <Card.Title>{infoUser.username} </Card.Title>
                <Card.Text>
                  {infoUser.firstName}
                  <span className='mr-2'>{infoUser.lastName}</span>
                </Card.Text>
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls='example-collapse-text'
                  aria-expanded={open}
                  className='btn-dark'
                >
                  Edit
                </Button>
              </div>

              <Collapse in={open}>
                <Form onSubmit={handleSubmit} className='mt-3'>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Username</Form.Label>
                    <InputInfo
                      name='username'
                      type='text'
                      value={infoUser.username}
                      placeholder={'Your name'}
                      handleInput={handleInput}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>FirstName </Form.Label>

                    <InputInfo
                      name='firstName'
                      type='text'
                      value={infoUser.firstName}
                      placeholder={'Your first name'}
                      handleInput={handleInput}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>LastName</Form.Label>
                    <InputInfo
                      name='lastName'
                      type='text'
                      value={infoUser.lastName}
                      placeholder={'Your last name'}
                      handleInput={handleInput}
                    />
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    className='btn-dark w-100'
                  >
                    Update
                  </Button>
                </Form>
              </Collapse>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
