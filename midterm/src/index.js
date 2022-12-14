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
import Creategroup from './components/Group/CreateGroup';
import Detailgroup from './components/Groups/Details';
import Joingroup from './components/Groups/JoinGroup';
import Chat from './components/ChatBox/BoxChat';
import SendInviteEmail from './components/Groups/SendInviteEmail';
import Profile from './user/profile';
// import HeaderHomePage from '../components/Header/HeaderHomepage';
import Quiz from './components/Quiz/Quiz';
import Demo from './components/Demo/Demo';
import Voting from './components/Voting/Voting';
import { SocketContext, socket } from './context/socket';

import { QueryClient, QueryClientProvider } from 'react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <SocketContext.Provider value={socket}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<HomePage />} />
              <Route path='about' element={<About />} />
              <Route path='groups' element={<Groups />} />
              <Route path='details' element={<Details />} />
              <Route path='about' element={<About />} />
              <Route path='quiz' element={<Quiz />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='/mygroup' element={<Mygroup />} />
            <Route path='/createGroup' element={<Creategroup />} />
            <Route path='/join/:id' element={<Joingroup />} />
            <Route path='/getGroups/:id' element={<Detailgroup />} />
            <Route path='/sendInviteEmail/:id' element={<SendInviteEmail />} />
            {/* <Route path='/getGroups/${idGroup}' element={<Detailgroup groupId= />}  /> */}

            <Route path='/register' element={<Register />} />
            <Route path='/chat/:id' element={<Chat />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='demo' element={<Demo />} />
            <Route path='voting' element={<Voting />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </QueryClientProvider>
  </SocketContext.Provider>
);

reportWebVitals();
