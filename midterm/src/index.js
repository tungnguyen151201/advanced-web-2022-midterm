import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import About from './components/About/About';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './user/profile';
import { QueryClient, QueryClientProvider } from 'react-query';
import './interceptor/axios';
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
            <Route path='products' element={<Products />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
