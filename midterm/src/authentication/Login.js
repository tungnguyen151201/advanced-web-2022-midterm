import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import axios from 'axios';

function Login() {
  const nagative = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    message: null,
  });

  async function onSubmit(data) {
    try {
      const { username, password } = data;
      const res = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      const { status, message, accessToken } = res.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      if (status) {
        setAlert({
          status,
          message,
        });
        console.log(accessToken);

        nagative('/profile');
      } else {
        setAlert({
          status,
          message,
        });
      }
    } catch (error) {
      setAlert({
        status: false,
        message: error,
      });
    }
  }

  const variant = alert.status ? 'success' : 'danger';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container fluid='md'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register('username', { required: 'Username is required' })}
            type='text'
            placeholder='Enter username'
          />
          {errors.username && (
            <Form.Text className='text-danger'>
              {errors.username.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register('password', { required: 'Password is required' })}
            type='password'
            placeholder='Password'
          />
          {errors.password && (
            <Form.Text className='text-danger'>
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Log in
        </Button>
        <Button variant='link' href='/'>
          Not a member yet? Sign up
        </Button>
        <Alert key={variant} variant={variant} hidden={alert.message === null}>
          {alert.message}
        </Alert>
      </Form>
    </Container>
  );
}

export default Login;
