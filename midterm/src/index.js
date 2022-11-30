import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/Groups/Groups';
import About from './components/About/About';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Groups from './components/Groups/Groups';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="groups" element={<Groups />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
