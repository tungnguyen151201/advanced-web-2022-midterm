import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    console.log('Register successed');
  };

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="header">
        <span>Already have an account?</span>
        <button
          className="btn-signup"
          onClick={() => {
            navigate('/login');
          }}
        >
          Log in
        </button>
      </div>

      <div className="title col-4 mx-auto">THT</div>
      <div className="welcome col-4 mx-auto">Begin your journey</div>

      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email(*)</label>
          <input type={'email'} className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Password(*)</label>
          <input type={'password'} className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>

        <div className="form-group">
          <label>Username(*)</label>
          <input type={'text'} className="form-control" value={username} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Create my free account
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

export default Register;
