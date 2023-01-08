import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BarChart from '../BarChart/BarChart';
import BoxChat from '../ChatBox/BoxChat';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import './Demo.css';
import { SocketContext } from '../../context/socket';
const Demo = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [presentation, setPresentation] = useState({
    name: 'test',
    owner: 'test',
    slides: [
      {
        question: "What's your name?",
        options: ['anwser 1', 'anwser 2', 'anwser 3'],
      },
      {
        question: 'Slide 2',
        options: ['anwser 1', 'anwser 2', 'anwser 3'],
      },
    ],
  });
  const [slide, setSlide] = useState(1);
  const [answers, setAnswers] = useState(
    Array.from(
      { length: presentation.slides[slide].options.length },
      (v) => (v = 0)
    )
  );

  const link = `http://localhost:3000/voting/${id}`;
  socket.emit('join-room', id);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to the clipboard');
  };

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
    socket.on('submit-answer', (data) => {
      let arr = Array.from(
        { length: presentation.slides[slide].options.length },
        (v, i) => (v = answers[i])
      );
      arr[data.answer.answer] += 1;
      setAnswers(arr);
    });
    return () => {
      socket.off('submit-answer');
    };
  }, [answers, id, presentation.slides, slide, socket, token]);

  return (
    <div className='demo__container'>
      <div className='demo__content'>
        <p className='demo__title'>Link the test</p>
        <div className='demo__link'>
          <input className='demo__input' value={link} />
          <button className='btn__copy' onClick={handleCopy}>
            Copy link
          </button>
        </div>
        <h1 className='demo__question'>
          {presentation.slides[slide].question}
        </h1>

        <div className='demo__chart'>
          <BarChart
            options={presentation.slides[slide].options}
            answers={answers}
          />
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
    </div>
  );
};

export default Demo;
