import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
const Register = () => {
  const navigate = useNavigate();

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
    const { email, username, password, firstName, lastName } = data;
    return axios
      .post('http://localhost:3001/sendVerifyEmail', {
        email,
      })
      .then((response) => {
        const { status } = response.data;
        if (status) {
          return axios.post('http://localhost:3001/register', {
            email,
            username,
            password,
            firstName,
            lastName,
          });
        }
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
    <div className='login-container'>
      <div className='header'>
        <span>Already have an account?</span>
        <button
          className='btn-signup'
          onClick={() => {
            navigate('/login');
          }}
        >
          Log in
        </button>
      </div>

      <div className='title col-4 mx-auto'>THT</div>
      <div className='welcome col-4 mx-auto'>Begin your journey</div>
      <Form
        className='content-form col-4 mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register('email', { required: 'Email is required' })}
            type='email'
            placeholder='Enter your email'
          />
          {errors.email && (
            <Form.Text className='text-danger'>
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>
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
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            {...register('firstName', { required: 'firstName is required' })}
            type='text'
            placeholder='Enter your first name'
          />
          {errors.firstName && (
            <Form.Text className='text-danger'>
              {errors.firstName.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>LastName</Form.Label>
          <Form.Control
            {...register('lastName', { required: 'lastName is required' })}
            type='text'
            placeholder='Enter your last name'
          />
          {errors.lastName && (
            <Form.Text className='text-danger'>
              {errors.lastName.message}
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

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            {...register('confirmPassword', {
              required: 'Confirm password is required',
            })}
            type='password'
            placeholder='Confirm password'
          />
          {errors.confirmPassword && (
            <Form.Text className='text-danger'>
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' type='submit' className='btn-submit'>
          {isLoading ? 'Loading...' : 'Sign up'}
        </Button>
        <Button variant='link' href='/login'>
          Already have an account? Log in
        </Button>
        <Alert key={variant} variant={variant}>
          {alert.message}
        </Alert>
        <div className='back'>
          <span
            onClick={() => {
              navigate('/');
            }}
          >
            {' '}
            &#60;&#60;Go to Homepage
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Register;
