import './Present.css';
import Edit from '../Edit/Edit';

export default function Present() {
  return (
    <div className="present__container">
      <div className="present">
        <p className="question">Question 1: What's your name?</p>
        <div className="answers">
          <div className="answer">Answer 1</div>
          <div className="answer">Answer 2</div>
          <div className="answer">Answer 3</div>
          <div className="answer">Answer 4</div>
        </div>
        <button className="btn__present">Pressent notes</button>
      </div>
    </div>
  );
}
