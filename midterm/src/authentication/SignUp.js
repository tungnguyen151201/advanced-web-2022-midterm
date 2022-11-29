import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import axios from 'axios';

function SignUp() {
  const [alert, setAlert] = useState({
    isSuccess: false,
    message: null,
  });

  const {
    isLoading,
    isSuccess,
    isError,
    data: response,
    mutate,
  } = useMutation((data) => {
    const { username, password } = data;
    return axios.post('http://localhost:3001/register', {
      username,
      password,
      firstName: "test",
      lastName: "test",
    });
  });

  async function onSubmit(data) {
    try {
      const { password, confirmPassword } = data;

      if (password !== confirmPassword) {
        setAlert({
          isSuccess: false,
          message: 'Wrong confirm password',
        });
        return;
      }

      mutate(data);
      if (isSuccess) {
        setAlert({
          isSuccess: response.data.isSuccess,
          message: response.data.message,
        });
      }
      if (isError) {
        setAlert({
          isSuccess: false,
          message: response.data.message,
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            {...register('confirmPassword', {
              required: 'Confirm password is required',
            })}
            type="password"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLoading ? 'Loading...' : 'Sign up'}
        </Button>
        <Button variant="link" href="/login">
          Already have an account? Log in
        </Button>
        <Alert key={variant} variant={variant} hidden={alert.message === null}>
          {alert.message}
        </Alert>
      </Form>
    </Container>
  );
}

export default SignUp;
