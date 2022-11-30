import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    message: null,
  });
  // const navigate = new useNavigate();

  // const navigate = useNavigate();
  async function onSubmit(data) {
    try {
      const { username, password } = data;
      const res = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      console.log(res);
      const { status, message, accessToken } = res.data;

      if (status) {
        setAlert({
          status,
          message,
        });
        localStorage.setItem('token', accessToken);

        navigate('/profile');
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const variant = alert.status ? 'success' : 'danger';

  return (
    <div className='login-container'>
      <div className='header'>
        <span>Don't have account yet?</span>
        <button
          className='btn-signup'
          onClick={() => {
            navigate('/register');
          }}
        >
          Sign up
        </button>
      </div>

      <div className='title col-4 mx-auto'>THT</div>
      <div className='welcome col-4 mx-auto'>Hello, who's this?</div>
      <Form
        className='content-form col-4 mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <Alert key={variant} variant={variant} hidden={alert.message === null}>
          {alert.message}
        </Alert>
        <Button variant='primary' type='submit' className='btn-submit'>
          Log in
        </Button>
        <Button variant='link' href='/register'>
          Not a member yet? Sign up
        </Button>

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

export default Login;
