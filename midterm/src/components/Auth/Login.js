import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postLogin } from '../../apiService/apiService';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Login successed');
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have account yet?</span>
        <button
          className="btn-signup"
          onClick={() => {
            navigate('/register');
          }}
        >
          Sign up
        </button>
      </div>

      <div className="title col-4 mx-auto">THT</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>

      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input type={'email'} className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type={'password'} className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login to THT
          </button>
        </div>
        <div className="back">
          <span
            onClick={() => {
              navigate('/');
            }}
          >
            {' '}
            &#60;&#60;Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
