import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import useGlobalState from '../../context/useAuthState';

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const [state, dispatch] = useGlobalState();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          THT
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/mygroup" className="nav-link">
              Groups
            </NavLink>
            <NavLink to="/myPresentations" className="nav-link">
              Presentations
            </NavLink>
          </Nav>
          {!state.token ? (
            <Nav>
              <button className="btn-login" onClick={() => handleLogin()}>
                Log in
              </button>
              <button className="btn-signup" onClick={() => handleRegister()}>
                Sign up
              </button>
            </Nav>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                'justify-content': 'center',
                gap: '20px',
              }}
            >
              <span
                className="header__account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  'justify-content': 'center',
                  gap: '6px',
                  fontSize: '18px',
                }}
              >
                <FaUserCircle />
                test
              </span>
              <Nav>
                <button
                  className="btn-login"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    dispatch({ userId: localStorage.getItem('userId'), token: localStorage.getItem('token') });
                  }}
                >
                  Log out
                </button>
              </Nav>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
