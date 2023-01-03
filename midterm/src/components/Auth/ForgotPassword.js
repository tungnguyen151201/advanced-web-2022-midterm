import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    message: null,
  });

  async function onSubmit(data) {
    try {
      const { email } = data;
      console.log(email);
      const res = await axios.post('http://localhost:3001/forgotPassword', {
        email,
      });
      console.log(res.data);
      const { status, message } = res.data;

      if (status) {
        setAlert({
          status,
          message,
        });
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
      <div className='welcome col-4 mx-auto'>Forgot Password</div>
      <Form
        className='content-form col-4 mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register('email', { required: 'Username is required' })}
            type='text'
            placeholder='Enter email'
          />
          {errors.username && (
            <Form.Text className='text-danger'>
              {errors.username.message}
            </Form.Text>
          )}
        </Form.Group>

        <Alert key={variant} variant={variant} hidden={alert.message === null}>
          {alert.message}
        </Alert>
        <Button variant='primary' type='submit' className='btn-submit'>
          Send Email
        </Button>

        <div className='back'>
          <span
            onClick={() => {
              navigate('/login');
            }}
          >
            {' '}
            &#60;&#60;Go to Login
          </span>
        </div>
      </Form>
    </div>
  );
}
