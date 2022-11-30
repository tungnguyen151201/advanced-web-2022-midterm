import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Products from './components/Groups/Groups';
import About from './components/About/About';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Groups from './components/Groups/Groups';
import Details from './components/Groups/Details';

import Mygroup from './user/mygroups';
import Profile from './user/profile';
// import HeaderHomePage from '../components/Header/HeaderHomepage';

import { QueryClient, QueryClientProvider } from 'react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='about' element={<About />} />
            <Route path='groups' element={<Groups />} />
            <Route path='details' element={<Details />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='/mygroup' element={<Mygroup />} />

          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
