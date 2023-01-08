import './PresentItem.css';
import { BsFillCaretRightSquareFill } from 'react-icons/bs';
import ThreeDotsMenu from '../ThreeDotsMenu/ThreeDotsMenu';

const PresentItem = ({ id, name, owner, createdAt }) => {
  return (
    <div className="prItem__container">
      <p className="prItem__name">
        <BsFillCaretRightSquareFill className="play__icon" />
        {name}
      </p>
      <p className="prItem__owner">{owner}</p>
      <p className="prItem__created">
        {createdAt}
        <ThreeDotsMenu id={id} />
      </p>
    </div>
  );
};

export default PresentItem;
