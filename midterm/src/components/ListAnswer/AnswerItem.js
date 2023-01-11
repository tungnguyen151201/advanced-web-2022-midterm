import './AnswerItem.css';
import { FaUserAlt } from 'react-icons/fa';

export default function AnswerItem() {
  return (
    <div className="answerItem__container">
      <p className="answerItem__user">
        <FaUserAlt /> User1
      </p>
      <div className="answerItem__answer">1</div>
    </div>
  );
}
