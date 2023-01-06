import './PresentItem.css';
import { BsFillCaretRightSquareFill } from 'react-icons/bs';
import ThreeDotsMenu from '../ThreeDotsMenu/ThreeDotsMenu';

const PresentItem = () => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  return (
    <div className="prItem__container">
      <p className="prItem__name">
        <BsFillCaretRightSquareFill className="play__icon" /> My first presentation
      </p>
      <p className="prItem__owner">me</p>
      <p className="prItem__created">
        {date}
        <ThreeDotsMenu />
      </p>
    </div>
  );
};

export default PresentItem;
