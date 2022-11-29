import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';

function Login() {
  const [alert, setAlert] = useState({
    isSuccess: false,
    message: null,
  });

  async function onSubmit(data) {
    try {
      const { username, password } = data;
      const res = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      const { isSuccess, message } = res.data;
      if (isSuccess) {
        setAlert({
          isSuccess,
          message,
        });
      } else {
        setAlert({
          isSuccess,
          message,
        });
      }
    } catch (error) {
      setAlert({
        isSuccess: false,
        message: error,
      });
    }
  }

  const variant = alert.isSuccess ? 'success' : 'danger';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register('username', { required: 'Username is required' })}
            type="text"
            placeholder="Enter username"
          />
          {errors.username && (
            <Form.Text className="text-danger">
              {errors.username.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register('password', { required: 'Password is required' })}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
        <Button variant="link" href="/">
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
