import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Voting.css';

const Voting = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const answers = document.querySelectorAll('.voting__answer');

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
  }, []);

  return (
    <div className="voting__container">
      <h1 className="voting__logo">THT</h1>
      <p className="voting__question">{presentation.slides[slide].question}</p>
      <div className="voting__answers">
        {presentation.slides[slide].options.map((value, index) => {
          return (
            <div className="voting__answer" key={index}>
              {value}
            </div>
          );
        })}
      </div>
      <div className="voting__submit">Submit</div>
    </div>
  );
};

export default Voting;
