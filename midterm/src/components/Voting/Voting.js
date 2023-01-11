import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Voting.css';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import BoxChat from '../ChatBox/BoxChat';
import { SocketContext } from '../../context/socket';
import useGlobalState from '../../context/useAuthState';
import { BsFillChatTextFill, BsCursorFill } from 'react-icons/bs';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
const Voting = () => {
  const [state] = useGlobalState();
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [question, setQuestion] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
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
  const handleCreateQuestion = () => {
    axios
      .post(
        `http://localhost:3001/presentation/createQuestion/${id}`,
        {
          question,
        },
        {
          headers: {
            Authorization: state.token,
          },
        }
      )
      .then((res) => {
        const { status } = res.data;
        console.log(res);
        if (status) {
          setShow(true);
        }
      });
  };
  const handleAnswer = () => {
    answers.forEach((answer) => {
      if (answer.classList.contains('active')) {
        socket.emit('submit-answer', {
          userId: state.userId,
          answer: answer.id,
        });
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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation/${id}`, {
        headers: {
          Authorization: state.token,
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
      console.log(error);
    });

    return () => {
      socket.off('connect_error');
      socket.off('handle-error');
    };
  }, [id, socket, state.token]);

  useEffect(() => {
    const handleChangeSlide = (data) => {
      setSlide(data);
    };
    socket.on('change-slide', handleChangeSlide);
    return () => {
      socket.off('change-slide');
    };
  }, [socket]);

  return (
    <div className='voting__container'>
      <h1 className='voting__logo'>{presentation.slides[slide].question}</h1>
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
        className='chat__btn'
        onClick={() => setOpen(!open)}
        aria-controls='example-collapse-text'
        aria-expanded={open}
      >
        <BsFillChatTextFill className='chat__icon' />
      </Button>
      <Collapse in={open}>
        <div id='example-collapse-text'>
          <BoxChat></BoxChat>
        </div>
      </Collapse>
      <h1 className='voting__post-question'>Have an question?</h1>
      <div className='voting__post-container'>
        <input
          type='text'
          placeholder='Enter your question'
          className='voting__input'
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <BsCursorFill
          className='voting__post-btn'
          onClick={handleCreateQuestion}
        />
      </div>
      <ToastContainer className='chat__toast p-3' position='bottom-center'>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          bg='success'
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Notify</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>update Successful!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Voting;
