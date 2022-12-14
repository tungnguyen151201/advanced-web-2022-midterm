import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Voting.css';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import BoxChat from '../ChatBox/BoxChat';
import { SocketContext } from '../../context/socket';

const Voting = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const answers = document.querySelectorAll('.voting__answer');
  socket.emit('join-room', id);

  function removeAllActiveClass() {
    answers.forEach((answer) => {
      answer.classList.remove('active');
    });
  }

  answers.forEach((answer) => {
    answer.addEventListener('click', () => {
      removeAllActiveClass();
      answer.classList.add('active');
    });
  });
  const handleAnswer = () => {
    answers.forEach((answer) => {
      if (answer.classList.contains('active')) {
        console.log(answer.id);
        socket.emit('submit-answer', { answer: answer.id });
      }
    });
  };
  const [presentation, setPresentation] = useState({
    name: 'test',
    owner: 'test',
    slides: [
      {
        question: "What's your name?",
        options: ['anwser 1', 'anwser 2', 'anwser 3', 'anwser 4'],
      },
      {
        question: 'Slide 2',
        options: ['anwser 1', 'anwser 2', 'anwser 3', 'anwser 4'],
      },
    ],
  });

  const [slide, setSlide] = useState(0);
  const token = 'Bearer ' + localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPresentation(res.data.presentation);
      });

    socket.on('connect_error', (err) => {
      if (err.message === 'xhr poll error') return;
      console.log(`connect_error :${err.message}`);
    });
    socket.on('handle-error', (error) => {
      // setError(error);
      console.log(error);
    });

    return () => {
      socket.off('submit-answer');
    };
  }, []);

  return (
    <div className='voting__container'>
      <h1 className='voting__logo'>THT</h1>
      <p className='voting__question'>{presentation.slides[slide].question}</p>
      <div className='voting__answers'>
        {presentation.slides[slide].options.map((value, index) => {
          return (
            <div className='voting__answer' key={index} id={index}>
              {value}
            </div>
          );
        })}
      </div>
      <div className='voting__submit' onClick={handleAnswer}>
        Submit
      </div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls='example-collapse-text'
        aria-expanded={open}
      >
        Box Chat
      </Button>
      <Collapse in={open}>
        <div id='example-collapse-text'>
          <BoxChat></BoxChat>
        </div>
      </Collapse>
    </div>
  );
};

export default Voting;
