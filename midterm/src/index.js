import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './components/About/About';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Quiz from './components/Quiz/Quiz';
import Demo from './components/Demo/Demo';
import Voting from './components/Voting/Voting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="demo" element={<Demo />} />
        <Route path="voting" element={<Voting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
