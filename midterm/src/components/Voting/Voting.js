import { useNavigate } from 'react-router-dom';
import './Voting.css';

const Voting = () => {
  const navigate = useNavigate();
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

  return (
    <div className="voting__container">
      <h1 className="voting__logo">THT</h1>
      <p className="voting__question">What's your name?</p>
      <div className="voting__answers">
        <div className="voting__answer">Answer 1</div>
        <div className="voting__answer">Answer 2</div>
        <div className="voting__answer">Answer 3</div>
        <div className="voting__answer">Answer 4</div>
      </div>
      <div className="voting__submit">Submit</div>
    </div>
  );
};

export default Voting;
