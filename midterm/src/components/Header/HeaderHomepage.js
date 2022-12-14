import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';
const HeaderHomePage = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    message: null,
  });
  const onLogout = async () => {
    try {
      const res = await axios.post('http://localhost:3001/logout', {});
      //   console.log(res);
      console.log(res.data);
      const { status, message } = res.data;
      if (status) {
        setAlert({
          status,
          message,
        });
        navigate('/');
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
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Toast>
          <Toast.Header>
            <strong className='me-auto'>Notification</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
        <NavLink to='/' className='navbar-brand'>
          THT
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <button className='btn-signup' onClick={onLogout}>
              Log out
            </button>
            <NavDropdown title='Language' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>VietNamese</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>English</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderHomePage;
